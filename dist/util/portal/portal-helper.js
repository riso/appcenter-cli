"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortalOrgLink = exports.getPortalTestLink = exports.getPortalBuildLink = void 0;
function getPortalBuildLink(portalBaseUrl, appOwner, appName, branchName, buildId) {
    const encodedBranchName = encodeURIComponent(branchName);
    return `${portalBaseUrl}/users/${appOwner}/apps/${appName}/build/branches/${encodedBranchName}/builds/${buildId}`;
}
exports.getPortalBuildLink = getPortalBuildLink;
function getPortalTestLink(portalBaseUrl, isOrg, appOwner, appName, seriesName, testRunId) {
    if (isOrg) {
        return encodeURI(`${portalBaseUrl}/orgs/${appOwner}/apps/${appName}/test/series/${seriesName}/runs/${testRunId}`);
    }
    else {
        return encodeURI(`${portalBaseUrl}/users/${appOwner}/apps/${appName}/test/series/${seriesName}/runs/${testRunId}`);
    }
}
exports.getPortalTestLink = getPortalTestLink;
function getPortalOrgLink(portalBaseUrl, orgName) {
    return `${portalBaseUrl}/orgs/${orgName}`;
}
exports.getPortalOrgLink = getPortalOrgLink;
