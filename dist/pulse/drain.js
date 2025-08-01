"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drain = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:drain');
const drain = async function () {
    return new Promise((resolve) => {
        debug('Pulse.drain called, clearing interval for processJobs()');
        clearInterval(this._processInterval);
        this._processInterval = undefined;
        if (this._runningJobs.length === 0) {
            resolve();
        }
        else {
            debug('Pulse.drain waiting for jobs to finish');
            this.on('complete', () => {
                if (this._runningJobs.length === 1) {
                    resolve();
                }
            });
        }
    });
};
exports.drain = drain;
//# sourceMappingURL=drain.js.map