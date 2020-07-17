"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
function formatDate(unixOffset) {
    let formattedDateString;
    const date = new Date(unixOffset);
    if (date_fns_1.differenceInMinutes(Date.now(), date) < 2) {
        formattedDateString = "Just now";
    }
    else {
        formattedDateString = date_fns_1.format(date, "MMM dd, hh:mm a");
    }
    return formattedDateString;
}
exports.formatDate = formatDate;
