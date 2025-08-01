"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:schedule');
const schedule = function schedule(when, names, data) {
    const createJob = async (when, name, data) => {
        const job = this.create(name, data);
        await job.schedule(when).save();
        return job;
    };
    const createJobs = async (when, names, data) => {
        try {
            const createJobList = [];
            names.map((name) => createJobList.push(createJob(when, name, data)));
            debug('Pulse.schedule()::createJobs() -> all jobs created successfully');
            return Promise.all(createJobList);
        }
        catch (error) {
            debug('Pulse.schedule()::createJobs() -> error creating one or more of the jobs');
            throw error;
        }
    };
    if (typeof names === 'string') {
        debug('Pulse.schedule(%s, %O, [%O], cb)', when, names);
        return createJob(when, names, data || {});
    }
    if (Array.isArray(names)) {
        debug('Pulse.schedule(%s, %O, [%O])', when, names);
        return createJobs(when, names, data || {});
    }
    throw new TypeError('Name must be string or array of strings');
};
exports.schedule = schedule;
//# sourceMappingURL=schedule.js.map