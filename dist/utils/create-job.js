"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = void 0;
const job_1 = require("../job");
const createJob = (pulse, jobData) => {
    jobData.pulse = pulse;
    return new job_1.Job(jobData);
};
exports.createJob = createJob;
//# sourceMappingURL=create-job.js.map