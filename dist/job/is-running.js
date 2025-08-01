"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRunning = void 0;
const isRunning = function (useRealStatus = false) {
    if (useRealStatus) {
        this.fetchStatus();
    }
    ``;
    if (!this.attrs.lastRunAt) {
        return false;
    }
    if (!this.attrs.lastFinishedAt) {
        return true;
    }
    if (this.attrs.lockedAt && this.attrs.lastRunAt.getTime() > this.attrs.lastFinishedAt.getTime()) {
        return true;
    }
    return false;
};
exports.isRunning = isRunning;
//# sourceMappingURL=is-running.js.map