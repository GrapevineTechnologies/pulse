"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = (0, debug_1.default)('pulse:every');
const every = async function (interval, names, data, options) {
    const createJob = async (interval, name, data, options) => {
        const job = this.create(name, data || {});
        job.attrs.type = 'single';
        job.repeatEvery(interval, options);
        return job.save();
    };
    const createJobs = async (interval, names, data, options) => {
        try {
            const jobs = [];
            names.map((name) => jobs.push(createJob(interval, name, data, options)));
            debug('every() -> all jobs created successfully');
            return Promise.all(jobs);
        }
        catch (error) {
            debug('every() -> error creating one or more of the jobs', error);
            throw new utils_1.PulseError('Error creating one or more of the jobs');
        }
    };
    if (Array.isArray(names)) {
        debug('Pulse.every(%s, %s, %O)', interval, names, options);
        const jobs = await createJobs(interval, names, data, options);
        return jobs;
    }
    debug('Pulse.every(%s, %O, %O)', interval, names, options);
    const jobs = await createJob(interval, names, data, options);
    return jobs;
};
exports.every = every;
//# sourceMappingURL=every.js.map