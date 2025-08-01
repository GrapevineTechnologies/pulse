"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:job');
const fail = function (reason) {
    const failReason = reason instanceof Error ? reason.message : reason;
    const attrs = this.attrs;
    attrs.failReason = failReason;
    attrs.failCount = (attrs.failCount || 0) + 1;
    attrs.runCount = attrs.runCount || 1;
    const now = new Date();
    attrs.failedAt = attrs.lastFinishedAt = now;
    debug('[%s:%s] fail() called [%d] times so far', attrs.name, attrs._id, attrs.failCount);
    const attempts = attrs.attempts || 0;
    const step = attrs.runCount <= attempts * (attempts + 1) ? Math.ceil(attrs.runCount / (attempts + 1)) : attempts;
    const retryCount = attrs.failCount - step;
    const backoff = attrs.backoff;
    if (attempts && backoff && retryCount < step * attempts) {
        const delayMultiplier = backoff.type === 'fixed' ? 1 : Math.pow(2, retryCount);
        attrs.nextRunAt = new Date(now.getTime() + delayMultiplier * backoff.delay);
        debug('[%s:%s] setting retry at time [%s], retryCount: [%d]', attrs.name, attrs._id, attrs.nextRunAt, retryCount);
    }
    return this;
};
exports.fail = fail;
//# sourceMappingURL=fail.js.map