"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJson = void 0;
const toJson = function () {
    const attrs = this.attrs || {};
    const result = {};
    for (const prop in attrs) {
        if ({}.hasOwnProperty.call(attrs, prop)) {
            result[prop] = attrs[prop];
        }
    }
    const dates = ['lastRunAt', 'lastFinishedAt', 'nextRunAt', 'failedAt', 'lockedAt'];
    dates.forEach((d) => {
        if (result[d]) {
            result[d] = new Date(result[d]);
        }
    });
    return result;
};
exports.toJson = toJson;
//# sourceMappingURL=to-json.js.map