"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportProfile = void 0;
const interaction_1 = require("../../../util/interaction");
function reportProfile(user) {
    interaction_1.out.report([
        ["Username", "name"],
        ["Display Name", "displayName"],
        ["Email", "email"],
    ], user);
}
exports.reportProfile = reportProfile;
