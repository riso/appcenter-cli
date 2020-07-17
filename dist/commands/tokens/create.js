"use strict";
// token create command
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
const interaction_1 = require("../../util/interaction");
const format_token_1 = require("./lib/format-token");
const apis_1 = require("../../util/apis");
const principal_type_1 = require("../../util/misc/principal-type");
let TokenCreateCommand = class TokenCreateCommand extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            principal_type_1.validatePrincipalType(this.principalType);
            const tokenMessaging = `Creating ${this.principalType} API token ...`;
            const tokenAttributes = {
                description: this.description,
            };
            let createTokenResponse;
            if (this.principalType === principal_type_1.PrincipalType.USER) {
                createTokenResponse = yield interaction_1.out.progress(tokenMessaging, apis_1.clientRequest((cb) => client.userApiTokens.newMethod(tokenAttributes, cb)));
            }
            else if (this.principalType === principal_type_1.PrincipalType.APP) {
                const app = this.app;
                createTokenResponse = yield interaction_1.out.progress(tokenMessaging, apis_1.clientRequest((cb) => client.appApiTokens.newMethod(app.ownerName, app.appName, tokenAttributes, cb)));
            }
            const statusCode = createTokenResponse.response.statusCode;
            if (statusCode >= 400) {
                switch (statusCode) {
                    case 400:
                    default:
                        return commandline_1.failure(commandline_1.ErrorCodes.Exception, "invalid request");
                    case 403:
                        return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "authorization to create an API token failed");
                    case 404:
                        return commandline_1.failure(commandline_1.ErrorCodes.NotLoggedIn, `${this.principalType} could not be found`);
                }
            }
            format_token_1.reportToken(createTokenResponse.result);
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Description of the API token"),
    commandline_1.shortName("d"),
    commandline_1.longName("description"),
    commandline_1.hasArg
], TokenCreateCommand.prototype, "description", void 0);
__decorate([
    commandline_1.help("The type of token: [ user, app ]. An app must be specified for app type tokens"),
    commandline_1.shortName("t"),
    commandline_1.longName("type"),
    commandline_1.hasArg,
    commandline_1.defaultValue("user")
], TokenCreateCommand.prototype, "principalType", void 0);
TokenCreateCommand = __decorate([
    commandline_1.help("Create a new API token")
], TokenCreateCommand);
exports.default = TokenCreateCommand;
