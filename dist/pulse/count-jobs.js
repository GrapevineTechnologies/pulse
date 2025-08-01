"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countJobs = exports.countJobsRepo = void 0;
const countJobsRepo = async function (query = {}, options = {}) {
    return await this._collection.countDocuments(query, options);
};
exports.countJobsRepo = countJobsRepo;
const countJobs = async function (query = {}, options = {}) {
    return await this._collection.countDocuments(query, options);
};
exports.countJobs = countJobs;
//# sourceMappingURL=count-jobs.js.map