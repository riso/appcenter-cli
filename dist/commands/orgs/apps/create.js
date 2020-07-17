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
const commandline_1 = require("../../../util/commandline");
const apis_1 = require("../../../util/apis");
const interaction_1 = require("../../../util/interaction");
const format_app_1 = require("../../apps/lib/format-app");
const app_release_type_validation_1 = require("../../apps/lib/app-release-type-validation");
let OrgAppCreateCommand = class OrgAppCreateCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const appAttributes = {
                displayName: this.displayName,
                platform: this.platform,
                os: this.os,
                description: this.description,
                name: this.appName,
            };
            if (this.release_type) {
                if (this.release_type.length > app_release_type_validation_1.APP_RELEASE_TYPE_VALIDATIONS.maxLength.rule) {
                    return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, app_release_type_validation_1.APP_RELEASE_TYPE_VALIDATIONS.maxLength.errorMessage);
                }
                if (!app_release_type_validation_1.APP_RELEASE_TYPE_VALIDATIONS.matchRegexp.rule.test(this.release_type)) {
                    return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, app_release_type_validation_1.APP_RELEASE_TYPE_VALIDATIONS.matchRegexp.errorMessage);
                }
                appAttributes.releaseType = this.release_type;
            }
            try {
                const createAppResponse = yield interaction_1.out.progress("Creating app in org...", apis_1.clientRequest((cb) => client.appsOperations.createForOrg(this.orgName, appAttributes, cb)));
                format_app_1.reportApp(createAppResponse.result);
                return commandline_1.success();
            }
            catch (error) {
                switch (error.statusCode) {
                    case 404:
                        return commandline_1.failure(commandline_1.ErrorCodes.NotFound, "there appears to be no such org");
                    case 409:
                        return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "an app with this 'name' already exists");
                    default:
                        return commandline_1.failure(commandline_1.ErrorCodes.Exception, "the request was rejected for an unknown reason");
                }
            }
        });
    }
};
__decorate([
    commandline_1.help("Name of the organization"),
    commandline_1.shortName("n"),
    commandline_1.longName("org-name"),
    commandline_1.required,
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "orgName", void 0);
__decorate([
    commandline_1.help("The name of the app used in URLs. Can optionally be provided specifically, otherwise a generated name will be derived from display-name"),
    commandline_1.shortName("a"),
    commandline_1.longName("app-name"),
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "appName", void 0);
__decorate([
    commandline_1.help("Description of the app"),
    commandline_1.longName("description"),
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "description", void 0);
__decorate([
    commandline_1.help("The descriptive name of the app. This can contain any characters"),
    commandline_1.shortName("d"),
    commandline_1.longName("display-name"),
    commandline_1.required,
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "displayName", void 0);
__decorate([
    commandline_1.help("The OS the app will be running on. Supported values: Android, Custom, iOS, macOS, tvOS, Windows"),
    commandline_1.shortName("o"),
    commandline_1.longName("os"),
    commandline_1.required,
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "os", void 0);
__decorate([
    commandline_1.help("The platform of the app. Supported values: Cordova, Java, Objective-C-Swift, React-Native, Unity, UWP, WinForms, WPF, Xamarin, Custom"),
    commandline_1.shortName("p"),
    commandline_1.longName("platform"),
    commandline_1.required,
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "platform", void 0);
__decorate([
    commandline_1.help("The app release type. Suggested values are Alpha, Beta, Production, Store, Enterprise. Custom values are allowed and must be must be one word, alphanumeric, first letter capitalized."),
    commandline_1.shortName("r"),
    commandline_1.longName("release-type"),
    commandline_1.hasArg
], OrgAppCreateCommand.prototype, "release_type", void 0);
OrgAppCreateCommand = __decorate([
    commandline_1.help("Create a new app in an organization")
], OrgAppCreateCommand);
exports.default = OrgAppCreateCommand;
