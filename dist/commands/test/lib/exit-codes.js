"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitCodes = void 0;
var ExitCodes;
(function (ExitCodes) {
    ExitCodes.Success = 0;
    // Exit codes between 1 and 63 are reserved for Test Cloud backend.
    ExitCodes.Timeout = 64;
})(ExitCodes = exports.ExitCodes || (exports.ExitCodes = {}));
