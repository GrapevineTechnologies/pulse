"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatEvery = void 0;
const repeatEvery = function (interval, options = {}) {
    this.attrs.repeatInterval = interval;
    this.attrs.repeatTimezone = options.timezone ? options.timezone : null;
    this.attrs.startDate = options.startDate ?? null;
    this.attrs.endDate = options.endDate ?? null;
    this.attrs.skipDays = options.skipDays ?? null;
    if (options.skipImmediate) {
        this.attrs.lastRunAt = this.attrs.nextRunAt || new Date();
        this.computeNextRunAt();
        this.attrs.lastRunAt = undefined;
    }
    else {
        this.computeNextRunAt();
    }
    return this;
};
exports.repeatEvery = repeatEvery;
//# sourceMappingURL=repeat-every.js.map