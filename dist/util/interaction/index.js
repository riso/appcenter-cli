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
exports.StreamingArrayOutput = exports.out = void 0;
var prompt_1 = require("./prompt");
Object.defineProperty(exports, "prompt", { enumerable: true, get: function () { return prompt_1.prompt; } });
const out = require("./out");
exports.out = out;
__exportStar(require("./io-options"), exports);
__exportStar(require("./padding"), exports);
__exportStar(require("./terminal"), exports);
const streaming_array_output_1 = require("./streaming-array-output");
exports.StreamingArrayOutput = streaming_array_output_1.default;
