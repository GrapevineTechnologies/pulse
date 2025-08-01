"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = exports.getJobsRepo = void 0;
const utils_1 = require("../utils");
const getJobsRepo = async function (query = {}, sort = {}, limit = 0, skip = 0) {
    return await this._collection.find(query).sort(sort).limit(limit).skip(skip).toArray();
};
exports.getJobsRepo = getJobsRepo;
const jobs = async function (query = {}, sort = {}, limit = 0, skip = 0) {
    const result = await exports.getJobsRepo.call(this, query, sort, limit, skip);
    return result.map((job) => (0, utils_1.createJob)(this, job));
};
exports.jobs = jobs;
//# sourceMappingURL=jobs.js.map