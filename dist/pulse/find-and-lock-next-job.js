"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndLockNextJob = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const mongodb_1 = require("mongodb");
const utils_1 = require("../utils");
const debug = (0, debug_1.default)('pulse:internal:_findAndLockNextJob');
const findAndLockNextJob = async function (jobName, definition) {
    const now = new Date();
    const lockDeadline = new Date(Date.now().valueOf() - definition.lockLifetime);
    debug('_findAndLockNextJob(%s, [Function])', jobName);
    const JOB_PROCESS_WHERE_QUERY = {
        $and: [
            {
                name: jobName,
                disabled: { $ne: true },
            },
            {
                $or: [
                    {
                        lockedAt: { $eq: null },
                        nextRunAt: { $lte: this._nextScanAt },
                    },
                    {
                        lockedAt: { $lte: lockDeadline },
                    },
                ],
            },
        ],
    };
    const JOB_PROCESS_SET_QUERY = { $set: { lockedAt: now } };
    const JOB_RETURN_QUERY = { includeResultMetadata: true, returnDocument: mongodb_1.ReturnDocument.AFTER, sort: this._sort };
    const result = await this._collection.findOneAndUpdate(JOB_PROCESS_WHERE_QUERY, JOB_PROCESS_SET_QUERY, JOB_RETURN_QUERY);
    let job = undefined;
    if (result?.value) {
        debug('found a job available to lock, creating a new job on Pulse with id [%s]', result.value._id);
        job = (0, utils_1.createJob)(this, result.value);
    }
    return job;
};
exports.findAndLockNextJob = findAndLockNextJob;
//# sourceMappingURL=find-and-lock-next-job.js.map