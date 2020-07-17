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
exports.tokenStore = void 0;
const os = require("os");
const path = require("path");
const file_token_store_1 = require("./file/file-token-store");
const win_token_store_1 = require("./win32/win-token-store");
const osx_token_store_1 = require("./osx/osx-token-store");
const misc_1 = require("../misc");
__exportStar(require("./token-store"), exports);
// Create default token store based on OS
//
// For now, every OS uses file
//
let store;
if (os.platform() === "win32") {
    store = win_token_store_1.createWinTokenStore();
}
else if (os.platform() === "darwin") {
    store = osx_token_store_1.createOsxTokenStore();
}
else {
    const tokenFilePath = path.join(misc_1.getProfileDir(), misc_1.tokenFile);
    store = file_token_store_1.createFileTokenStore(tokenFilePath);
}
exports.tokenStore = store;
