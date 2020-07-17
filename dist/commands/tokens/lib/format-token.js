"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportToken = exports.reportTokenInfo = void 0;
const interaction_1 = require("../../../util/interaction");
function reportTokenInfo(token) {
    interaction_1.out.report([
        ["ID", "id"],
        ["Description", "description"],
        ["Created at", "createdAt"],
    ], token);
}
exports.reportTokenInfo = reportTokenInfo;
function reportToken(token) {
    interaction_1.out.report([
        ["ID", "id"],
        ["API Token", "apiToken"],
        ["Description", "description"],
        ["Created at", "createdAt"],
    ], token);
}
exports.reportToken = reportToken;
