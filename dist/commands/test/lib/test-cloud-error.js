"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCloudError = void 0;
class TestCloudError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.exitCode = errorCode;
    }
}
exports.TestCloudError = TestCloudError;
