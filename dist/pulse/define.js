"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = exports.JobPriority = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:define');
var JobPriority;
(function (JobPriority) {
    JobPriority[JobPriority["highest"] = 20] = "highest";
    JobPriority[JobPriority["high"] = 10] = "high";
    JobPriority[JobPriority["normal"] = 0] = "normal";
    JobPriority[JobPriority["low"] = -10] = "low";
    JobPriority[JobPriority["lowest"] = -20] = "lowest";
})(JobPriority || (exports.JobPriority = JobPriority = {}));
const define = function (name, processor, options) {
    this._definitions[name] = {
        fn: processor,
        concurrency: options?.concurrency || this._defaultConcurrency,
        lockLimit: options?.lockLimit || this._defaultLockLimit,
        priority: options?.priority || JobPriority.normal,
        lockLifetime: options?.lockLifetime || this._defaultLockLifetime,
        running: 0,
        locked: 0,
        shouldSaveResult: options?.shouldSaveResult || false,
        attempts: options?.attempts || 0,
        backoff: options?.attempts && {
            type: options?.backoff?.type || 'exponential',
            delay: options?.backoff?.delay || 1000,
        },
    };
    debug('job [%s] defined with following options: \n%O', name, this._definitions[name]);
};
exports.define = define;
//# sourceMappingURL=define.js.map