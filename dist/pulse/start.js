"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = (0, debug_1.default)('pulse:start');
const start = async function () {
    if (this._processInterval) {
        debug('Pulse.start was already called, ignoring');
        return this._ready;
    }
    await this._ready;
    debug('Pulse.start called, creating interval to call processJobs every [%dms]', this._processEvery);
    this._processInterval = setInterval(utils_1.processJobs.bind(this), this._processEvery);
    process.nextTick(utils_1.processJobs.bind(this));
};
exports.start = start;
//# sourceMappingURL=start.js.map