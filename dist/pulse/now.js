"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:now');
const now = async function (name, data) {
    debug('Pulse.now(%s, [Object])', name);
    try {
        const job = this.create(name, data || {});
        job.schedule(new Date());
        await job.save();
        return job;
    }
    catch (error) {
        debug('error trying to create a job for this exact moment');
        throw error;
    }
};
exports.now = now;
//# sourceMappingURL=now.js.map