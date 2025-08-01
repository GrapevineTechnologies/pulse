"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeOnRestart = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:resumeOnRestart');
const resumeOnRestart = function (resume = true) {
    debug('Pulse.resumeOnRestart()');
    this._resumeOnRestart = resume;
    if (this._collection && this._resumeOnRestart) {
        const now = new Date();
        this._collection
            .updateMany({
            $or: [
                {
                    lockedAt: { $exists: true },
                    nextRunAt: { $ne: null },
                    $or: [{ $expr: { $eq: ['$runCount', '$finishedCount'] } }, { lastFinishedAt: { $exists: false } }],
                },
                {
                    lockedAt: { $exists: false },
                    lastFinishedAt: { $exists: false },
                    nextRunAt: { $lte: now, $ne: null },
                },
            ],
        }, {
            $unset: { lockedAt: undefined, lastModifiedBy: undefined, lastRunAt: undefined },
            $set: { nextRunAt: now },
        })
            .then((result) => {
            if (result.modifiedCount > 0) {
                debug('resuming unfinished %d jobs(%s)', result.modifiedCount, now.toISOString());
            }
        });
    }
    return this;
};
exports.resumeOnRestart = resumeOnRestart;
//# sourceMappingURL=resume-on-restart.js.map