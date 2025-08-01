"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:stop');
const stop = async function () {
    const _unlockJobs = async () => {
        return new Promise((resolve, reject) => {
            debug('Pulse._unlockJobs()');
            const jobIds = this._lockedJobs.map((job) => job.attrs._id);
            if (jobIds.length === 0) {
                debug('no jobs to unlock');
                resolve();
            }
            debug('about to unlock jobs with ids: %O', jobIds);
            this._collection
                .updateMany({ _id: { $in: jobIds } }, { $set: { lockedAt: null } })
                .then(() => {
                this._lockedJobs = [];
                return resolve();
            })
                .catch((error) => {
                if (error) {
                    return reject(error);
                }
                this._lockedJobs = [];
                return resolve();
            });
        });
    };
    debug('Pulse.stop called, clearing interval for processJobs()');
    clearInterval(this._processInterval);
    this._processInterval = undefined;
    return _unlockJobs();
};
exports.stop = stop;
//# sourceMappingURL=stop.js.map