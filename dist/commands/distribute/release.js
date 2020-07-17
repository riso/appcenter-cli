"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const commandline_1 = require("../../util/commandline");
const apis_1 = require("../../util/apis");
const interaction_1 = require("../../util/interaction");
const util_1 = require("util");
const _ = require("lodash");
const Path = require("path");
const Pfs = require("../../util/misc/promisfied-fs");
const profile_1 = require("../../util/profile");
const mc_fus_api_1 = require("./lib/mc-fus-uploader/mc-fus-api");
const distribute_util_1 = require("./lib/distribute-util");
const environment_vars_1 = require("../../util/profile/environment-vars");
const mc_fus_uploader_1 = require("./lib/mc-fus-uploader/mc-fus-uploader");
const mc_fus_uploader_types_1 = require("./lib/mc-fus-uploader/mc-fus-uploader-types");
const environments_1 = require("../../util/profile/environments");
const node_fetch_1 = require("node-fetch");
const debug = require("debug")("appcenter-cli:commands:distribute:release");
let ReleaseBinaryCommand = class ReleaseBinaryCommand extends commandline_1.AppCommand {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            this.validateParameters();
            debug("Loading prerequisites");
            const [distributionGroupUsersCount, storeInformation, releaseNotesString] = yield interaction_1.out.progress("Loading prerequisites...", this.getPrerequisites(client));
            this.validateParametersWithPrerequisites(storeInformation);
            const createdReleaseUpload = yield this.createReleaseUpload(client, app);
            const releaseId = yield this.uploadFile(createdReleaseUpload, client, app);
            yield this.uploadReleaseNotes(releaseNotesString, client, app, releaseId);
            yield this.distributeToGroup(client, app, releaseId);
            yield this.distributeToStore(storeInformation, client, app, releaseId);
            yield this.checkReleaseOnThePortal(distributionGroupUsersCount, client, app, releaseId);
            return commandline_1.success();
        });
    }
    uploadFile(releaseUploadParams, client, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadId = releaseUploadParams.id;
            const assetId = releaseUploadParams.package_asset_id;
            const urlEncodedToken = releaseUploadParams.url_encoded_token;
            const uploadDomain = releaseUploadParams.upload_domain;
            try {
                yield interaction_1.out.progress("Uploading release binary...", this.uploadFileToUri(assetId, urlEncodedToken, uploadDomain));
                yield interaction_1.out.progress("Finishing the upload...", this.patchUpload(app, uploadId));
                return yield interaction_1.out.progress("Checking the uploaded file...", this.loadReleaseIdUntilSuccess(app, uploadId));
            }
            catch (error) {
                try {
                    interaction_1.out.text("Release upload failed");
                    yield this.abortReleaseUpload(client, app, uploadId);
                    interaction_1.out.text("Release upload was aborted");
                }
                catch (abortError) {
                    debug("Failed to abort release upload");
                }
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, error.message);
            }
        });
    }
    uploadReleaseNotes(releaseNotesString, client, app, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (releaseNotesString && releaseNotesString.length > 0) {
                debug("Setting release notes");
                yield this.putReleaseDetails(client, app, releaseId, releaseNotesString);
            }
            else {
                debug("Skipping empty release notes");
            }
        });
    }
    distributeToGroup(client, app, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_.isNil(this.distributionGroup)) {
                debug("Distributing the release to a group");
                const distributionGroupResponse = yield distribute_util_1.getDistributionGroup({
                    client,
                    releaseId,
                    app: this.app,
                    destination: this.distributionGroup,
                    destinationType: "group",
                });
                yield distribute_util_1.addGroupToRelease({
                    client,
                    releaseId,
                    distributionGroup: distributionGroupResponse,
                    app: this.app,
                    destination: this.distributionGroup,
                    destinationType: "group",
                    mandatory: this.mandatory,
                    silent: this.silent,
                });
            }
        });
    }
    distributeToStore(storeInformation, client, app, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_.isNil(storeInformation)) {
                debug("Distributing the release to a store");
                try {
                    yield this.publishToStore(client, app, storeInformation, releaseId);
                }
                catch (error) {
                    if (!_.isNil(this.distributionGroup)) {
                        interaction_1.out.text(`Release was successfully distributed to group '${this.distributionGroup}' but could not be published to store '${this.storeName}'.`);
                    }
                    throw error;
                }
            }
        });
    }
    checkReleaseOnThePortal(distributionGroupUsersCount, client, app, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug("Retrieving the release");
            const releaseDetails = yield this.getDistributeRelease(client, app, releaseId);
            if (releaseDetails) {
                if (!_.isNil(this.distributionGroup)) {
                    const storeComment = !_.isNil(this.storeName) ? ` and to store '${this.storeName}'` : "";
                    if (_.isNull(distributionGroupUsersCount)) {
                        interaction_1.out.text((rd) => `Release ${rd.shortVersion} (${rd.version}) was successfully released to ${this.distributionGroup}${storeComment}`, releaseDetails);
                    }
                    else {
                        interaction_1.out.text((rd) => `Release ${rd.shortVersion} (${rd.version}) was successfully released to ${distributionGroupUsersCount} testers in ${this.distributionGroup}${storeComment}`, releaseDetails);
                    }
                }
                else {
                    interaction_1.out.text((rd) => `Release ${rd.shortVersion} (${rd.version}) was successfully released to store '${this.storeName}'`, releaseDetails);
                }
            }
            else {
                interaction_1.out.text(`Release was successfully released.`);
            }
        });
    }
    validateParameters() {
        debug("Checking for invalid parameter combinations");
        if (!_.isNil(this.releaseNotes) && !_.isNil(this.releaseNotesFile)) {
            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "'--release-notes' and '--release-notes-file' switches are mutually exclusive");
        }
        if (_.isNil(this.distributionGroup) && _.isNil(this.storeName)) {
            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "At least one of '--group' or '--store' must be specified");
        }
        if (!_.isNil(this.distributionGroup)) {
            if ([".aab"].includes(this.fileExtension)) {
                throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `Files of type '${this.fileExtension}' can not be distributed to groups`);
            }
        }
        if (!_.isNil(this.storeName)) {
            if (![".aab", ".apk", ".ipa"].includes(this.fileExtension)) {
                throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `Files of type '${this.fileExtension}' can not be distributed to stores`);
            }
        }
        if (_.isNil(this.buildVersion)) {
            if ([".zip", ".msi"].includes(this.fileExtension)) {
                throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `--build-version parameter must be specified when uploading ${this.fileExtension} files`);
            }
        }
        if (_.isNil(this.buildNumber) || _.isNil(this.buildVersion)) {
            if ([".pkg", ".dmg"].includes(this.fileExtension)) {
                throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `--build-version and --build-number must both be specified when uploading ${this.fileExtension} files`);
            }
        }
        if (!_.isNil(this.filePath)) {
            const binary = new mc_fus_uploader_1.McFile(this.filePath);
            if (!binary || binary.size <= 0) {
                throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `File '${this.filePath}' does not exist.`);
            }
        }
    }
    validateParametersWithPrerequisites(storeInformation) {
        debug("Checking for invalid parameter combinations with prerequisites");
        if (storeInformation && storeInformation.type === "apple" && _.isNil(this.releaseNotes) && _.isNil(this.releaseNotesFile)) {
            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "At least one of '--release-notes' or '--release-notes-file' must be specified when publishing to an Apple store.");
        }
    }
    getPrerequisites(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // load release notes file or use provided release notes if none was specified
            const releaseNotesString = this.getReleaseNotesString();
            let distributionGroupUsersNumber;
            let storeInformation;
            if (!_.isNil(this.distributionGroup)) {
                // get number of distribution group users (and check distribution group existence)
                // return null if request has failed because of any reason except non-existing group name.
                distributionGroupUsersNumber = this.getDistributionGroupUsersNumber(client);
            }
            if (!_.isNil(this.storeName)) {
                // get distribution store type to check existence and further filtering
                storeInformation = this.getStoreDetails(client);
            }
            return Promise.all([distributionGroupUsersNumber, storeInformation, releaseNotesString]);
        });
    }
    getReleaseNotesString() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_.isNil(this.releaseNotesFile)) {
                try {
                    return yield Pfs.readFile(this.releaseNotesFile, "utf8");
                }
                catch (error) {
                    if (error.code === "ENOENT") {
                        throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `release notes file '${this.releaseNotesFile}' doesn't exist`);
                    }
                    else {
                        throw error;
                    }
                }
            }
            else {
                return this.releaseNotes;
            }
        });
    }
    getDistributionGroupUsersNumber(client) {
        return __awaiter(this, void 0, void 0, function* () {
            let distributionGroupUsersRequestResponse;
            try {
                distributionGroupUsersRequestResponse = yield apis_1.clientRequest((cb) => client.distributionGroups.listUsers(this.app.ownerName, this.app.appName, this.distributionGroup, cb));
                const statusCode = distributionGroupUsersRequestResponse.response.statusCode;
                if (statusCode >= 400) {
                    throw statusCode;
                }
            }
            catch (error) {
                if (error === 404) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `distribution group ${this.distributionGroup} was not found`);
                }
                else {
                    debug(`Failed to get users of distribution group ${this.distributionGroup}, returning null - ${util_1.inspect(error)}`);
                    return null;
                }
            }
            return distributionGroupUsersRequestResponse.result.length;
        });
    }
    getStoreDetails(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeDetailsResponse = yield apis_1.clientRequest((cb) => client.stores.get(this.storeName, this.app.ownerName, this.app.appName, cb));
                const statusCode = storeDetailsResponse.response.statusCode;
                if (statusCode >= 400) {
                    throw { statusCode };
                }
                return storeDetailsResponse.result;
            }
            catch (error) {
                if (error.statusCode === 404) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `store '${this.storeName}' was not found`);
                }
                else {
                    debug(`Failed to get store details for '${this.storeName}', returning null - ${util_1.inspect(error)}`);
                    return null;
                }
            }
        });
    }
    createReleaseUpload(client, app) {
        return __awaiter(this, void 0, void 0, function* () {
            debug("Creating release upload");
            const profile = profile_1.getUser();
            const endpoint = yield this.getEndpoint(profile);
            const accessToken = yield this.getToken(profile);
            const url = mc_fus_api_1.getFileUploadLink(endpoint, app.ownerName, app.appName);
            const body = JSON.stringify({ build_version: this.buildVersion, build_number: this.buildNumber });
            const response = yield node_fetch_1.default(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-token": accessToken,
                },
                body: body,
            });
            const json = yield response.json();
            if (!json.package_asset_id || (json.statusCode && json.statusCode !== 200)) {
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to create release upload for ${this.filePath}. ${json.message}`);
            }
            return json;
        });
    }
    uploadFileToUri(assetId, urlEncodedToken, uploadDomain) {
        return new Promise((resolve, reject) => {
            debug("Uploading the release binary");
            const uploadSettings = {
                assetId: assetId,
                urlEncodedToken: urlEncodedToken,
                uploadDomain: uploadDomain,
                tenant: "distribution",
                onProgressChanged: (progress) => {
                    debug("onProgressChanged: " + progress.percentCompleted);
                },
                onMessage: (message, properties, level) => {
                    debug(`onMessage: ${message} \nMessage properties: ${JSON.stringify(properties)}`);
                    if (level === mc_fus_uploader_types_1.McFusMessageLevel.Error) {
                        this.mcFusUploader.cancel();
                        reject(new Error(`Uploading file error: ${message}`));
                    }
                },
                onStateChanged: (status) => {
                    debug(`onStateChanged: ${status.toString()}`);
                },
                onCompleted: (uploadStats) => {
                    debug("Upload completed, total time: " + uploadStats.totalTimeInSeconds);
                    resolve();
                },
            };
            this.mcFusUploader = new mc_fus_uploader_1.McFusNodeUploader(uploadSettings);
            const appFile = new mc_fus_uploader_1.McFile(this.filePath);
            this.mcFusUploader.start(appFile);
        });
    }
    patchUpload(app, uploadId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug("Patching the upload");
            const profile = profile_1.getUser();
            const endpoint = yield this.getEndpoint(profile);
            const accessToken = yield this.getToken(profile);
            const url = mc_fus_api_1.getPatchUploadLink(endpoint, app.ownerName, app.appName, uploadId);
            const response = yield node_fetch_1.default(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-token": accessToken,
                },
                body: '{"upload_status":"uploadFinished"}',
            });
            if (!response.ok) {
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `Failed to patch release upload. HTTP Status:${response.status} - ${response.statusText}`);
            }
            const json = yield response.json();
            const { upload_status, message } = json;
            if (upload_status !== "uploadFinished") {
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `Failed to patch release upload: ${message}`);
            }
        });
    }
    loadReleaseIdUntilSuccess(app, uploadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const timerId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    let response;
                    try {
                        response = yield this.loadReleaseId(app, uploadId);
                    }
                    catch (error) {
                        clearInterval(timerId);
                        reject(new Error(`Loading release id failed with error: ${error.errorMessage}`));
                    }
                    const releaseId = response.release_distinct_id;
                    debug(`Received release id is ${releaseId}`);
                    if (response.upload_status === "readyToBePublished" && releaseId) {
                        clearInterval(timerId);
                        resolve(Number(releaseId));
                    }
                    else if (response.upload_status === "error") {
                        clearInterval(timerId);
                        reject(new Error(`Loading release id failed: ${response.error_details}`));
                    }
                }), 2000);
            });
        });
    }
    loadReleaseId(app, uploadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                debug("Loading release id...");
                const profile = profile_1.getUser();
                const endpoint = yield this.getEndpoint(profile);
                const accessToken = yield this.getToken(profile);
                const url = mc_fus_api_1.getPatchUploadLink(endpoint, app.ownerName, app.appName, uploadId);
                const response = yield node_fetch_1.default(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-token": accessToken,
                    },
                });
                if (response.status < 200 || response.status >= 300) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to get release id with HTTP status: ${response.status} - ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to get release id for upload id: ${uploadId}, error: ${JSON.stringify(error)}`);
            }
        });
    }
    getToken(profile) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.token) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                return this.token;
            }
            else if (profile) {
                const accessToken = yield profile.accessToken;
                if ((accessToken === null || accessToken === void 0 ? void 0 : accessToken.length) > 0) {
                    return accessToken;
                }
            }
            return environment_vars_1.getTokenFromEnvironmentVar();
        });
    }
    getEndpoint(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.environmentName || !profile) {
                return environments_1.environments(this.environmentName).endpoint;
            }
            else {
                return profile.endpoint;
            }
        });
    }
    abortReleaseUpload(client, app, uploadId) {
        return __awaiter(this, void 0, void 0, function* () {
            let abortReleaseUploadRequestResponse;
            try {
                abortReleaseUploadRequestResponse = yield interaction_1.out.progress("Aborting release upload...", apis_1.clientRequest((cb) => client.releaseUploads.complete(uploadId, app.ownerName, app.appName, "aborted", cb)));
            }
            catch (error) {
                throw new Error(`HTTP ${abortReleaseUploadRequestResponse.response.statusCode} - ${abortReleaseUploadRequestResponse.response.statusMessage}`);
            }
        });
    }
    getDistributeRelease(client, app, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            let releaseRequestResponse;
            try {
                releaseRequestResponse = yield interaction_1.out.progress(`Retrieving the release...`, apis_1.clientRequest((cb) => __awaiter(this, void 0, void 0, function* () { return client.releasesOperations.getLatestByUser(releaseId.toString(), app.ownerName, app.appName, cb); })));
            }
            catch (error) {
                if (error === 400) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.Exception, "release_id is not an integer or the string latest");
                }
                else if (error === 404) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `The release ${releaseId} can't be found`);
                }
                else {
                    return null;
                }
            }
            return releaseRequestResponse.result;
        });
    }
    putReleaseDetails(client, app, releaseId, releaseNotesString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result, response } = yield interaction_1.out.progress(`Updating release details...`, apis_1.clientRequest((cb) => __awaiter(this, void 0, void 0, function* () {
                    return client.releasesOperations.updateDetails(releaseId, app.ownerName, app.appName, {
                        releaseNotes: releaseNotesString,
                    }, cb);
                })));
                const statusCode = response.statusCode;
                if (statusCode >= 400) {
                    debug(`Got error response: ${util_1.inspect(response)}`);
                    throw statusCode;
                }
                return result;
            }
            catch (error) {
                if (error === 400) {
                    throw commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to set the release notes");
                }
                else {
                    debug(`Failed to distribute the release - ${util_1.inspect(error)}`);
                    throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to set release notes for release ${releaseId}`);
                }
            }
        });
    }
    publishToStore(client, app, storeInformation, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result, response } = yield interaction_1.out.progress(`Publishing to store '${storeInformation.name}'...`, apis_1.clientRequest((cb) => __awaiter(this, void 0, void 0, function* () { return client.releasesOperations.addStore(releaseId, app.ownerName, app.appName, storeInformation.id, cb); })));
                const statusCode = response.statusCode;
                if (statusCode >= 400) {
                    throw result;
                }
                return result;
            }
            catch (error) {
                debug(`Failed to distribute the release to store - ${util_1.inspect(error)}`);
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, error.message);
            }
        });
    }
    get fileExtension() {
        return Path.parse(this.filePath).ext.toLowerCase();
    }
};
__decorate([
    commandline_1.help("Path to binary file"),
    commandline_1.shortName("f"),
    commandline_1.longName("file"),
    commandline_1.required,
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "filePath", void 0);
__decorate([
    commandline_1.help("Build version parameter required for .zip, .msi, .pkg and .dmg files"),
    commandline_1.shortName("b"),
    commandline_1.longName("build-version"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "buildVersion", void 0);
__decorate([
    commandline_1.help("Build number parameter required for macOS .pkg and .dmg files"),
    commandline_1.shortName("n"),
    commandline_1.longName("build-number"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "buildNumber", void 0);
__decorate([
    commandline_1.help("Distribution group name"),
    commandline_1.shortName("g"),
    commandline_1.longName("group"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "distributionGroup", void 0);
__decorate([
    commandline_1.help("Store name"),
    commandline_1.shortName("s"),
    commandline_1.longName("store"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "storeName", void 0);
__decorate([
    commandline_1.help("Release notes text"),
    commandline_1.shortName("r"),
    commandline_1.longName("release-notes"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "releaseNotes", void 0);
__decorate([
    commandline_1.help("Path to release notes file"),
    commandline_1.shortName("R"),
    commandline_1.longName("release-notes-file"),
    commandline_1.hasArg
], ReleaseBinaryCommand.prototype, "releaseNotesFile", void 0);
__decorate([
    commandline_1.help("Do not notify testers of this release"),
    commandline_1.longName("silent")
], ReleaseBinaryCommand.prototype, "silent", void 0);
__decorate([
    commandline_1.help("Make the release mandatory for the testers (default is false)"),
    commandline_1.longName("mandatory")
], ReleaseBinaryCommand.prototype, "mandatory", void 0);
ReleaseBinaryCommand = __decorate([
    commandline_1.help("Upload release binary and trigger distribution, at least one of --store or --group must be specified")
], ReleaseBinaryCommand);
exports.default = ReleaseBinaryCommand;
