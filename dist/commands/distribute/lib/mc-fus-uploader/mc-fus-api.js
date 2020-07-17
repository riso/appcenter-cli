"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatchUploadLink = exports.getFileUploadLink = void 0;
function getFileUploadLink(baseUrl, ownerName, appName) {
    return baseUrl + "/v0.1/apps/" + ownerName + "/" + appName + "/uploads/releases";
}
exports.getFileUploadLink = getFileUploadLink;
function getPatchUploadLink(baseUrl, ownerName, appName, uploadId) {
    return baseUrl + "/v0.1/apps/" + ownerName + "/" + appName + "/uploads/releases/" + uploadId;
}
exports.getPatchUploadLink = getPatchUploadLink;
