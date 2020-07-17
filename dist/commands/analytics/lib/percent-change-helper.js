"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentChange = void 0;
function calculatePercentChange(currentValue, previousValue) {
    if (previousValue !== 0) {
        return ((currentValue - previousValue) / previousValue) * 100;
    }
    else if (currentValue === 0) {
        return 0;
    }
    else {
        return 100;
    }
}
exports.calculatePercentChange = calculatePercentChange;
