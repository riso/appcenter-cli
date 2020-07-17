"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvFromEnvironmentVar = exports.getTelemetrySourceFromEnvironmentVar = exports.getTokenFromEnvironmentVar = exports.appCenterTelemetrySourceEnvVar = exports.appCenterAccessTokenEnvVar = void 0;
const process = require("process");
const environments_1 = require("./environments");
exports.appCenterAccessTokenEnvVar = "APPCENTER_ACCESS_TOKEN";
exports.appCenterTelemetrySourceEnvVar = "APPCENTER_TELEMETRY_SOURCE";
function getTokenFromEnvironmentVar() {
    return process.env[exports.appCenterAccessTokenEnvVar];
}
exports.getTokenFromEnvironmentVar = getTokenFromEnvironmentVar;
function getTelemetrySourceFromEnvironmentVar() {
    return process.env[exports.appCenterTelemetrySourceEnvVar];
}
exports.getTelemetrySourceFromEnvironmentVar = getTelemetrySourceFromEnvironmentVar;
function getEnvFromEnvironmentVar() {
    return process.env["APPCENTER_ENV"] || environments_1.defaultEnvironmentName();
}
exports.getEnvFromEnvironmentVar = getEnvFromEnvironmentVar;
