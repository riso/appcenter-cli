"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrincipalType = exports.allPrincipalTypes = exports.PrincipalType = void 0;
const commandline_1 = require("../commandline");
var PrincipalType;
(function (PrincipalType) {
    PrincipalType["USER"] = "user";
    PrincipalType["APP"] = "app";
})(PrincipalType = exports.PrincipalType || (exports.PrincipalType = {}));
exports.allPrincipalTypes = [PrincipalType.USER, PrincipalType.APP];
function validatePrincipalType(principalType) {
    if (exports.allPrincipalTypes.includes(principalType)) {
        return;
    }
    throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "Provided token type is invalid. Should be one of: [" + exports.allPrincipalTypes.join(", ") + "]");
}
exports.validatePrincipalType = validatePrincipalType;
