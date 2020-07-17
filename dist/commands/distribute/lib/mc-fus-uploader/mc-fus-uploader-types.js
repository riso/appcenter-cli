"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McFusUploadState = exports.McFusMessageLevel = void 0;
var McFusMessageLevel;
(function (McFusMessageLevel) {
    McFusMessageLevel[McFusMessageLevel["Information"] = 0] = "Information";
    McFusMessageLevel[McFusMessageLevel["Verbose"] = 1] = "Verbose";
    McFusMessageLevel[McFusMessageLevel["Error"] = 2] = "Error";
})(McFusMessageLevel = exports.McFusMessageLevel || (exports.McFusMessageLevel = {}));
var McFusUploadState;
(function (McFusUploadState) {
    McFusUploadState[McFusUploadState["New"] = 0] = "New";
    McFusUploadState[McFusUploadState["Initialized"] = 10] = "Initialized";
    McFusUploadState[McFusUploadState["Uploading"] = 20] = "Uploading";
    McFusUploadState[McFusUploadState["ResumeOrRestart"] = 40] = "ResumeOrRestart";
    McFusUploadState[McFusUploadState["Paused"] = 50] = "Paused";
    McFusUploadState[McFusUploadState["Error"] = 60] = "Error";
    McFusUploadState[McFusUploadState["Cancelled"] = 80] = "Cancelled";
    McFusUploadState[McFusUploadState["Verifying"] = 90] = "Verifying";
    McFusUploadState[McFusUploadState["Completed"] = 100] = "Completed";
    McFusUploadState[McFusUploadState["FatalError"] = 500] = "FatalError";
})(McFusUploadState = exports.McFusUploadState || (exports.McFusUploadState = {}));
