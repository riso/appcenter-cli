"use strict";
//
// Shared constants used across the CLI.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenFile = exports.profileFile = exports.oldProfileDirName = exports.profileDirName = exports.scriptName = void 0;
//
// Name of our command line interface program, used in help messages and a few other places
//
exports.scriptName = "appcenter";
//
// Directory name for profile files
//
exports.profileDirName = ".appcenter-cli";
exports.oldProfileDirName = ".mobile-center-cli";
//
// File name for profile file
//
exports.profileFile = "profile.json";
//
// Token file storage
//
exports.tokenFile = "tokens.json";
