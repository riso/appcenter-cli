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
const util_1 = require("util");
const create_client_1 = require("../../../util/apis/create-client");
const Pfs = require("../../../util/misc/promisfied-fs");
const _ = require("lodash");
const debug = require("debug")("appcenter-cli:commands:distribute:releases:edit-notes");
let EditReleaseCommand = class EditReleaseCommand extends commandline_1.AppCommand {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            this.validateParameters();
            const releaseId = Number(this.releaseId);
            if (!Number.isSafeInteger(releaseId) || releaseId <= 0) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `${this.releaseId} is not a valid release id`);
            }
            let releaseDetails;
            try {
                debug("Loading release details");
                const httpRequest = yield interaction_1.out.progress("Loading release details...", apis_1.clientRequest((cb) => client.releasesOperations.getLatestByUser(this.releaseId, app.ownerName, app.appName, cb)));
                if (httpRequest.response.statusCode >= 400) {
                    return httpRequest.response.statusCode === 404
                        ? commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `release ${this.releaseId} doesn't exist`)
                        : commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to load release details");
                }
                else {
                    releaseDetails = httpRequest.result;
                }
            }
            catch (error) {
                create_client_1.handleHttpError(error, false, "failed to load release details");
            }
            const releaseNotes = yield this.getReleaseNotesString();
            try {
                debug(`Updating release notes`);
                const httpResponse = yield interaction_1.out.progress(`Updating release notes`, apis_1.clientRequest((cb) => client.releasesOperations.updateDetails(releaseId, app.ownerName, app.appName, { releaseNotes: releaseNotes }, cb)));
                if (httpResponse.response.statusCode >= 400) {
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to update the release notes`);
                }
            }
            catch (error) {
                debug(`Failed to update the release - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to update the release notes`);
            }
            interaction_1.out.text(`Release ${releaseDetails.shortVersion} (${releaseDetails.version}) with id: ${this.releaseId} has been updated`);
            return commandline_1.success();
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
    validateParameters() {
        debug("Checking for invalid parameter combinations");
        if (!_.isNil(this.releaseNotes) && !_.isNil(this.releaseNotesFile)) {
            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "'--release-notes' and '--release-notes-file' parameters are mutually exclusive");
        }
        else if (_.isNil(this.releaseNotes) && _.isNil(this.releaseNotesFile)) {
            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "One of '--release-notes' and '--release-notes-file' is required");
        }
    }
};
__decorate([
    commandline_1.help("Release ID"),
    commandline_1.shortName("r"),
    commandline_1.longName("release-id"),
    commandline_1.required,
    commandline_1.hasArg
], EditReleaseCommand.prototype, "releaseId", void 0);
__decorate([
    commandline_1.help("Release notes text"),
    commandline_1.shortName("n"),
    commandline_1.longName("release-notes"),
    commandline_1.hasArg
], EditReleaseCommand.prototype, "releaseNotes", void 0);
__decorate([
    commandline_1.help("Path to release notes file"),
    commandline_1.shortName("N"),
    commandline_1.longName("release-notes-file"),
    commandline_1.hasArg
], EditReleaseCommand.prototype, "releaseNotesFile", void 0);
EditReleaseCommand = __decorate([
    commandline_1.help("Update release notes")
], EditReleaseCommand);
exports.default = EditReleaseCommand;
