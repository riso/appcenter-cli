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
var command_1 = require("./command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
var app_command_1 = require("./app-command");
Object.defineProperty(exports, "AppCommand", { enumerable: true, get: function () { return app_command_1.AppCommand; } });
Object.defineProperty(exports, "getCurrentApp", { enumerable: true, get: function () { return app_command_1.getCurrentApp; } });
var option_decorators_1 = require("./option-decorators");
Object.defineProperty(exports, "shortName", { enumerable: true, get: function () { return option_decorators_1.shortName; } });
Object.defineProperty(exports, "longName", { enumerable: true, get: function () { return option_decorators_1.longName; } });
Object.defineProperty(exports, "hasArg", { enumerable: true, get: function () { return option_decorators_1.hasArg; } });
Object.defineProperty(exports, "position", { enumerable: true, get: function () { return option_decorators_1.position; } });
Object.defineProperty(exports, "name", { enumerable: true, get: function () { return option_decorators_1.name; } });
Object.defineProperty(exports, "required", { enumerable: true, get: function () { return option_decorators_1.required; } });
Object.defineProperty(exports, "defaultValue", { enumerable: true, get: function () { return option_decorators_1.defaultValue; } });
Object.defineProperty(exports, "help", { enumerable: true, get: function () { return option_decorators_1.help; } });
var command_runner_1 = require("./command-runner");
Object.defineProperty(exports, "runner", { enumerable: true, get: function () { return command_runner_1.runner; } });
__exportStar(require("./command-result"), exports);
__exportStar(require("./autocomplete"), exports);
