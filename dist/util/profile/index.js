"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var environments_1 = require("./environments");
Object.defineProperty(exports, "environments", { enumerable: true, get: function () { return environments_1.environments; } });
Object.defineProperty(exports, "defaultEnvironmentName", { enumerable: true, get: function () { return environments_1.defaultEnvironmentName; } });
Object.defineProperty(exports, "getPortalUrlForEndpoint", { enumerable: true, get: function () { return environments_1.getPortalUrlForEndpoint; } });
__exportStar(require("./profile"), exports);
var telemetry_1 = require("./telemetry");
Object.defineProperty(exports, "telemetryIsEnabled", { enumerable: true, get: function () { return telemetry_1.telemetryIsEnabled; } });
Object.defineProperty(exports, "saveTelemetryOption", { enumerable: true, get: function () { return telemetry_1.saveTelemetryOption; } });
__exportStar(require("./environment-vars"), exports);
