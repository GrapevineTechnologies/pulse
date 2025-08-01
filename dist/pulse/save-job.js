"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJob = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = (0, debug_1.default)('pulse:saveJob');
const processDbResult = async function (job, result) {
    debug('processDbResult() called with success, checking whether to process job immediately or not');
    let resultValue = result.insertedId ? result.insertedId : result.value;
    if (resultValue) {
        let _id;
        let nextRunAt;
        if (result.insertedId) {
            _id = result.insertedId;
            const _job = await this._collection.findOne({ _id });
            if (_job) {
                nextRunAt = _job.nextRunAt;
            }
        }
        else {
            if (Array.isArray(resultValue)) {
                resultValue = resultValue[0];
            }
            _id = resultValue._id;
            nextRunAt = resultValue.nextRunAt;
        }
        job.attrs._id = _id;
        job.attrs.nextRunAt = nextRunAt;
        if (job.attrs.nextRunAt && job.attrs.nextRunAt < this._nextScanAt) {
            debug('[%s:%s] job would have ran by nextScanAt, processing the job immediately', job.attrs.name, resultValue._id);
            await utils_1.processJobs.call(this, job);
        }
    }
    return job;
};
const saveJob = async function (job) {
    try {
        if (!this._collection) {
            throw new utils_1.JobError('A db must be set up before you can save a job');
        }
        debug('attempting to save a job into Pulse instance');
        const id = job.attrs._id;
        const { uniqueQuery: unique, uniqueOpts } = job.attrs;
        const props = job.toJSON();
        delete props._id;
        delete props.uniqueQuery;
        delete props.uniqueOpts;
        props.lastModifiedBy = this._name;
        debug('[job %s] set job props: \n%O', id, props);
        const now = new Date();
        const protect = {};
        let update = { $set: props };
        debug('current time stored as %s', now.toISOString());
        if (id) {
            debug('job already has _id, calling findOneAndUpdate() using _id as query');
            const result = await this._collection.findOneAndUpdate({ _id: id }, update, {
                includeResultMetadata: true,
                returnDocument: 'after',
            });
            return await processDbResult.call(this, job, result);
        }
        if (props.type === 'single') {
            debug('job with type of "single" found');
            if (props.nextRunAt && props.nextRunAt <= now) {
                debug('job has a scheduled nextRunAt time, protecting that field from upsert');
                protect.nextRunAt = props.nextRunAt;
                delete props.nextRunAt;
            }
            if (Object.keys(protect).length > 0) {
                update.$setOnInsert = protect;
            }
            debug('calling findOneAndUpdate() with job name and type of "single" as query');
            const result = await this._collection.findOneAndUpdate({
                name: props.name,
                type: 'single',
            }, update, { includeResultMetadata: true, upsert: true, returnDocument: 'after' });
            return await processDbResult.call(this, job, result);
        }
        if (unique) {
            const query = job.attrs.uniqueQuery;
            query.name = props.name;
            if (uniqueOpts?.insertOnly) {
                update = { $setOnInsert: props };
            }
            debug('calling findOneAndUpdate() with unique object as query: \n%O', query);
            const result = await this._collection.findOneAndUpdate(query, update, {
                includeResultMetadata: true,
                upsert: true,
                returnDocument: 'after',
            });
            return await processDbResult.call(this, job, result);
        }
        debug('using default behavior, inserting new job via insertOne() with props that were set: \n%O', props);
        const result = await this._collection.insertOne(props);
        return await processDbResult.call(this, job, result);
    }
    catch (error) {
        debug('processDbResult() received an error, job was not updated/created');
        throw error;
    }
};
exports.saveJob = saveJob;
//# sourceMappingURL=save-job.js.map