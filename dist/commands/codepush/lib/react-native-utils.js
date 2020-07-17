"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactNativeProject = exports.isValidPlatform = exports.isValidOS = exports.getHermesEnabled = exports.runHermesEmitBinaryCommand = exports.runReactNativeBundleCommand = exports.getReactNativeProjectAppVersion = exports.spawn = void 0;
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const interaction_1 = require("../../../util/interaction");
const validation_utils_1 = require("./validation-utils");
const file_utils_1 = require("./file-utils");
const chalk = require("chalk");
const xcode = require("xcode");
const plist = require("plist");
const g2js = require("gradle-to-js/lib/parser");
const properties = require("properties");
const childProcess = require("child_process");
exports.spawn = childProcess.spawn;
function getReactNativeProjectAppVersion(versionSearchParams, projectRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        projectRoot = projectRoot || process.cwd();
        // eslint-disable-next-line security/detect-non-literal-require
        const projectPackageJson = require(path.join(projectRoot, "package.json"));
        const projectName = projectPackageJson.name;
        const fileExists = (file) => {
            try {
                return fs.statSync(file).isFile();
            }
            catch (e) {
                return false;
            }
        };
        interaction_1.out.text(chalk.cyan(`Detecting ${versionSearchParams.os} app version:\n`));
        if (versionSearchParams.os === "ios") {
            let resolvedPlistFile = versionSearchParams.plistFile;
            if (resolvedPlistFile) {
                // If a plist file path is explicitly provided, then we don't
                // need to attempt to "resolve" it within the well-known locations.
                if (!fileExists(resolvedPlistFile)) {
                    throw new Error("The specified plist file doesn't exist. Please check that the provided path is correct.");
                }
            }
            else {
                // Allow the plist prefix to be specified with or without a trailing
                // separator character, but prescribe the use of a hyphen when omitted,
                // since this is the most commonly used convetion for plist files.
                if (versionSearchParams.plistFilePrefix && /.+[^-.]$/.test(versionSearchParams.plistFilePrefix)) {
                    versionSearchParams.plistFilePrefix += "-";
                }
                const iOSDirectory = "ios";
                const plistFileName = `${versionSearchParams.plistFilePrefix || ""}Info.plist`;
                const knownLocations = [path.join(iOSDirectory, projectName, plistFileName), path.join(iOSDirectory, plistFileName)];
                resolvedPlistFile = knownLocations.find(fileExists);
                if (!resolvedPlistFile) {
                    throw new Error(`Unable to find either of the following plist files in order to infer your app's binary version: "${knownLocations.join('", "')}". If your plist has a different name, or is located in a different directory, consider using either the "--plist-file" or "--plist-file-prefix" parameters to help inform the CLI how to find it.`);
                }
            }
            const plistContents = fs.readFileSync(resolvedPlistFile).toString();
            let parsedPlist;
            try {
                parsedPlist = plist.parse(plistContents);
            }
            catch (e) {
                throw new Error(`Unable to parse "${resolvedPlistFile}". Please ensure it is a well-formed plist file.`);
            }
            if (parsedPlist && parsedPlist.CFBundleShortVersionString) {
                if (validation_utils_1.isValidVersion(parsedPlist.CFBundleShortVersionString)) {
                    interaction_1.out.text(`Using the target binary version value "${parsedPlist.CFBundleShortVersionString}" from "${resolvedPlistFile}".\n`);
                    return Promise.resolve(parsedPlist.CFBundleShortVersionString);
                }
                else {
                    if (parsedPlist.CFBundleShortVersionString !== "$(MARKETING_VERSION)") {
                        throw new Error(`The "CFBundleShortVersionString" key in the "${resolvedPlistFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                    }
                    const iOSDirectory = "ios";
                    const xcodeprojDirectory = `${projectName}.xcodeproj`;
                    const pbxprojFileName = "project.pbxproj";
                    const pbxprojKnownLocations = [
                        path.join(iOSDirectory, xcodeprojDirectory, pbxprojFileName),
                        path.join(iOSDirectory, pbxprojFileName),
                    ];
                    const resolvedPbxprojFile = pbxprojKnownLocations.find(fileExists);
                    if (!resolvedPbxprojFile) {
                        throw new Error(`Unable to find either of the following pbxproj files in order to infer your app's binary version: "${pbxprojKnownLocations.join('", "')}".`);
                    }
                    const xcodeProj = xcode.project(resolvedPbxprojFile).parseSync();
                    // If the build configuration name is not defined in the release-command, then "Release" build configuration is used by default.
                    const buildConfigurationName = versionSearchParams.buildConfigurationName;
                    const configsObj = xcodeProj.getBuildConfigByName(buildConfigurationName);
                    if (Object.keys(configsObj).length === 0) {
                        throw new Error(`Unable to find the build configuration with "${buildConfigurationName}" name.`);
                    }
                    const marketingVersion = Object.values(configsObj).find((c) => c.buildSettings["MARKETING_VERSION"]).buildSettings
                        .MARKETING_VERSION;
                    if (!validation_utils_1.isValidVersion(marketingVersion)) {
                        throw new Error(`The "MARKETING_VERSION" key in the "${resolvedPbxprojFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                    }
                    interaction_1.out.text(`Using the target binary version value "${marketingVersion}" from "${resolvedPbxprojFile}".\n`);
                    return Promise.resolve(marketingVersion);
                }
            }
            else {
                throw new Error(`The "CFBundleShortVersionString" key doesn't exist within the "${resolvedPlistFile}" file.`);
            }
        }
        else if (versionSearchParams.os === "android") {
            let buildGradlePath = path.join("android", "app");
            if (versionSearchParams.gradleFile) {
                buildGradlePath = versionSearchParams.gradleFile;
            }
            if (fs.lstatSync(buildGradlePath).isDirectory()) {
                buildGradlePath = path.join(buildGradlePath, "build.gradle");
            }
            if (file_utils_1.fileDoesNotExistOrIsDirectory(buildGradlePath)) {
                throw new Error(`Unable to find gradle file "${buildGradlePath}".`);
            }
            return g2js
                .parseFile(buildGradlePath)
                .catch(() => {
                throw new Error(`Unable to parse the "${buildGradlePath}" file. Please ensure it is a well-formed Gradle file.`);
            })
                .then((buildGradle) => {
                let versionName = null;
                // First 'if' statement was implemented as workaround for case
                // when 'build.gradle' file contains several 'android' nodes.
                // In this case 'buildGradle.android' prop represents array instead of object
                // due to parsing issue in 'g2js.parseFile' method.
                if (buildGradle.android instanceof Array) {
                    for (let i = 0; i < buildGradle.android.length; i++) {
                        const gradlePart = buildGradle.android[i];
                        if (gradlePart.defaultConfig && gradlePart.defaultConfig.versionName) {
                            versionName = gradlePart.defaultConfig.versionName;
                            break;
                        }
                    }
                }
                else if (buildGradle.android && buildGradle.android.defaultConfig && buildGradle.android.defaultConfig.versionName) {
                    versionName = buildGradle.android.defaultConfig.versionName;
                }
                else {
                    throw new Error(`The "${buildGradlePath}" file doesn't specify a value for the "android.defaultConfig.versionName" property.`);
                }
                if (typeof versionName !== "string") {
                    throw new Error(`The "android.defaultConfig.versionName" property value in "${buildGradlePath}" is not a valid string. If this is expected, consider using the --target-binary-version option to specify the value manually.`);
                }
                let appVersion = versionName.replace(/"/g, "").trim();
                if (validation_utils_1.isValidVersion(appVersion)) {
                    // The versionName property is a valid semver string,
                    // so we can safely use that and move on.
                    interaction_1.out.text(`Using the target binary version value "${appVersion}" from "${buildGradlePath}".\n`);
                    return appVersion;
                }
                // The version property isn't a valid semver string
                // so we assume it is a reference to a property variable.
                const propertyName = appVersion.replace("project.", "");
                const propertiesFileName = "gradle.properties";
                const knownLocations = [path.join("android", "app", propertiesFileName), path.join("android", propertiesFileName)];
                // Search for gradle properties across all `gradle.properties` files
                let propertiesFile = null;
                for (let i = 0; i < knownLocations.length; i++) {
                    propertiesFile = knownLocations[i];
                    if (fileExists(propertiesFile)) {
                        const propertiesContent = fs.readFileSync(propertiesFile).toString();
                        try {
                            const parsedProperties = properties.parse(propertiesContent);
                            appVersion = parsedProperties[propertyName];
                            if (appVersion) {
                                break;
                            }
                        }
                        catch (e) {
                            throw new Error(`Unable to parse "${propertiesFile}". Please ensure it is a well-formed properties file.`);
                        }
                    }
                }
                if (!appVersion) {
                    throw new Error(`No property named "${propertyName}" exists in the "${propertiesFile}" file.`);
                }
                if (!validation_utils_1.isValidVersion(appVersion)) {
                    throw new Error(`The "${propertyName}" property in the "${propertiesFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                }
                interaction_1.out.text(`Using the target binary version value "${appVersion}" from the "${propertyName}" key in the "${propertiesFile}" file.\n`);
                return appVersion.toString();
            });
        }
        else {
            const appxManifestFileName = "Package.appxmanifest";
            let appxManifestContents;
            let appxManifestContainingFolder;
            try {
                appxManifestContainingFolder = path.join("windows", projectName);
                appxManifestContents = fs.readFileSync(path.join(appxManifestContainingFolder, appxManifestFileName)).toString();
            }
            catch (err) {
                throw new Error(`Unable to find or read "${appxManifestFileName}" in the "${path.join("windows", projectName)}" folder.`);
            }
            return new Promise((resolve, reject) => {
                xml2js.parseString(appxManifestContents, (err, parsedAppxManifest) => {
                    if (err) {
                        reject(new Error(`Unable to parse the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file, it could be malformed.`));
                        return;
                    }
                    try {
                        const appVersion = parsedAppxManifest.Package.Identity[0]["$"].Version.match(/^\d+\.\d+\.\d+/)[0];
                        interaction_1.out.text(`Using the target binary version value "${appVersion}" from the "Identity" key in the "${appxManifestFileName}" file.\n`);
                        return resolve(appVersion);
                    }
                    catch (e) {
                        reject(new Error(`Unable to parse the package version from the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file.`));
                        return;
                    }
                });
            });
        }
    });
}
exports.getReactNativeProjectAppVersion = getReactNativeProjectAppVersion;
function runReactNativeBundleCommand(bundleName, development, entryFile, outputFolder, platform, sourcemapOutput, extraBundlerOptions) {
    const reactNativeBundleArgs = [];
    const envNodeArgs = process.env.CODE_PUSH_NODE_ARGS;
    if (typeof envNodeArgs !== "undefined") {
        Array.prototype.push.apply(reactNativeBundleArgs, envNodeArgs.trim().split(/\s+/));
    }
    Array.prototype.push.apply(reactNativeBundleArgs, [
        getCliPath(),
        "bundle",
        "--assets-dest",
        outputFolder,
        "--bundle-output",
        path.join(outputFolder, bundleName),
        "--dev",
        development,
        "--entry-file",
        entryFile,
        "--platform",
        platform,
        ...extraBundlerOptions,
    ]);
    if (sourcemapOutput) {
        reactNativeBundleArgs.push("--sourcemap-output", sourcemapOutput);
    }
    interaction_1.out.text(chalk.cyan('Running "react-native bundle" command:\n'));
    const reactNativeBundleProcess = exports.spawn("node", reactNativeBundleArgs);
    interaction_1.out.text(`node ${reactNativeBundleArgs.join(" ")}`);
    return new Promise((resolve, reject) => {
        reactNativeBundleProcess.stdout.on("data", (data) => {
            interaction_1.out.text(data.toString().trim());
        });
        reactNativeBundleProcess.stderr.on("data", (data) => {
            console.error(data.toString().trim());
        });
        reactNativeBundleProcess.on("close", (exitCode) => {
            if (exitCode) {
                reject(new Error(`"react-native bundle" command exited with code ${exitCode}.`));
            }
            resolve(null);
        });
    });
}
exports.runReactNativeBundleCommand = runReactNativeBundleCommand;
function runHermesEmitBinaryCommand(bundleName, outputFolder, sourcemapOutput, extraHermesFlags) {
    const hermesArgs = [];
    const envNodeArgs = process.env.CODE_PUSH_NODE_ARGS;
    if (typeof envNodeArgs !== "undefined") {
        Array.prototype.push.apply(hermesArgs, envNodeArgs.trim().split(/\s+/));
    }
    Array.prototype.push.apply(hermesArgs, [
        "-emit-binary",
        "-out",
        path.join(outputFolder, bundleName + ".hbc"),
        path.join(outputFolder, bundleName),
        ...extraHermesFlags,
    ]);
    if (sourcemapOutput) {
        hermesArgs.push("-output-source-map");
    }
    if (!interaction_1.isDebug()) {
        hermesArgs.push("-w");
    }
    interaction_1.out.text(chalk.cyan("Converting JS bundle to byte code via Hermes, running command:\n"));
    const hermesCommand = getHermesCommand();
    const hermesProcess = exports.spawn(hermesCommand, hermesArgs);
    interaction_1.out.text(`${hermesCommand} ${hermesArgs.join(" ")}`);
    return new Promise((resolve, reject) => {
        hermesProcess.stdout.on("data", (data) => {
            interaction_1.out.text(data.toString().trim());
        });
        hermesProcess.stderr.on("data", (data) => {
            console.error(data.toString().trim());
        });
        hermesProcess.on("close", (exitCode) => {
            if (exitCode) {
                reject(new Error(`"hermes" command exited with code ${exitCode}.`));
            }
            // Copy HBC bundle to overwrite JS bundle
            const source = path.join(outputFolder, bundleName + ".hbc");
            const destination = path.join(outputFolder, bundleName);
            fs.copyFile(source, destination, (err) => {
                if (err) {
                    console.error(err);
                    reject(new Error(`Copying file ${source} to ${destination} failed. "hermes" previously exited with code ${exitCode}.`));
                }
                fs.unlink(source, (err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(null);
                });
            });
        });
    }).then(() => {
        if (!sourcemapOutput) {
            return null;
        }
        const composeSourceMapsPath = getComposeSourceMapsPath();
        if (!composeSourceMapsPath) {
            throw new Error("react-native compose-source-maps.js scripts is not found");
        }
        const jsCompilerSourceMapFile = path.join(outputFolder, bundleName + ".hbc" + ".map");
        if (!fs.existsSync(jsCompilerSourceMapFile)) {
            throw new Error("sourcemap file is not found");
        }
        return new Promise((resolve, reject) => {
            const composeSourceMapsArgs = [sourcemapOutput, jsCompilerSourceMapFile, "-o", sourcemapOutput];
            // https://github.com/facebook/react-native/blob/master/react.gradle#L211
            // index.android.bundle.packager.map + index.android.bundle.compiler.map = index.android.bundle.map
            const composeSourceMapsProcess = exports.spawn(composeSourceMapsPath, composeSourceMapsArgs);
            interaction_1.out.text(`${composeSourceMapsPath} ${composeSourceMapsArgs.join(" ")}`);
            composeSourceMapsProcess.stdout.on("data", (data) => {
                interaction_1.out.text(data.toString().trim());
            });
            composeSourceMapsProcess.stderr.on("data", (data) => {
                console.error(data.toString().trim());
            });
            composeSourceMapsProcess.on("close", (exitCode) => {
                if (exitCode) {
                    reject(new Error(`"compose-source-maps" command exited with code ${exitCode}.`));
                }
                // Delete the HBC sourceMap, otherwise it will be included in 'code-push' bundle as well
                fs.unlink(jsCompilerSourceMapFile, (err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(null);
                });
            });
        });
    });
}
exports.runHermesEmitBinaryCommand = runHermesEmitBinaryCommand;
function getHermesEnabled(gradleFile) {
    let buildGradlePath = path.join("android", "app");
    if (gradleFile) {
        buildGradlePath = gradleFile;
    }
    if (fs.lstatSync(buildGradlePath).isDirectory()) {
        buildGradlePath = path.join(buildGradlePath, "build.gradle");
    }
    if (file_utils_1.fileDoesNotExistOrIsDirectory(buildGradlePath)) {
        throw new Error(`Unable to find gradle file "${buildGradlePath}".`);
    }
    return g2js
        .parseFile(buildGradlePath)
        .catch(() => {
        throw new Error(`Unable to parse the "${buildGradlePath}" file. Please ensure it is a well-formed Gradle file.`);
    })
        .then((buildGradle) => {
        return Array.from(buildGradle["project.ext.react"]).includes("enableHermes: true");
    });
}
exports.getHermesEnabled = getHermesEnabled;
function getHermesOSBin() {
    switch (process.platform) {
        case "win32":
            return "win64-bin";
        case "darwin":
            return "osx-bin";
        case "freebsd":
        case "linux":
        case "sunos":
        default:
            return "linux64-bin";
    }
}
function getHermesOSExe() {
    switch (process.platform) {
        case "win32":
            return "hermes.exe";
        default:
            return "hermes";
    }
}
function getHermesCommand() {
    const fileExists = (file) => {
        try {
            return fs.statSync(file).isFile();
        }
        catch (e) {
            return false;
        }
    };
    // assume if hermes-engine exists it should be used instead of hermesvm
    const hermesEngine = path.join("node_modules", "hermes-engine", getHermesOSBin(), getHermesOSExe());
    if (fileExists(hermesEngine)) {
        return hermesEngine;
    }
    return path.join("node_modules", "hermesvm", getHermesOSBin(), "hermes");
}
function getComposeSourceMapsPath() {
    // detect if compose-source-maps.js script exists
    const composeSourceMapsPath = path.join("node_modules", "react-native", "scripts", "compose-source-maps.js");
    if (fs.existsSync(composeSourceMapsPath)) {
        return composeSourceMapsPath;
    }
    return null;
}
function getCliPath() {
    if (process.platform === "win32") {
        return path.join("node_modules", "react-native", "local-cli", "cli.js");
    }
    return path.join("node_modules", ".bin", "react-native");
}
function isValidOS(os) {
    switch (os.toLowerCase()) {
        case "android":
        case "ios":
        case "windows":
            return true;
        default:
            return false;
    }
}
exports.isValidOS = isValidOS;
function isValidPlatform(platform) {
    return platform.toLowerCase() === "react-native";
}
exports.isValidPlatform = isValidPlatform;
function isReactNativeProject() {
    try {
        // eslint-disable-next-line security/detect-non-literal-require
        const projectPackageJson = require(path.join(process.cwd(), "package.json"));
        const projectName = projectPackageJson.name;
        if (!projectName) {
            throw new Error(`The "package.json" file in the CWD does not have the "name" field set.`);
        }
        return (projectPackageJson.dependencies["react-native"] ||
            (projectPackageJson.devDependencies && projectPackageJson.devDependencies["react-native"]));
    }
    catch (error) {
        throw new Error(`Unable to find or read "package.json" in the CWD. The "release-react" command must be executed in a React Native project folder.`);
    }
}
exports.isReactNativeProject = isReactNativeProject;
