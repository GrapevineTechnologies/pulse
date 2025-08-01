"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJobs = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const create_job_1 = require("./create-job");
const error_1 = require("./error");
const debug = (0, debug_1.default)('pulse:internal:processJobs');
const processJobs = async function (extraJob) {
    debug('starting to process jobs: [%s:%s]', extraJob?.attrs?.name ?? 'unknownName', extraJob?.attrs?._id ?? 'unknownId');
    if (!this._processInterval) {
        debug('no _processInterval set when calling processJobs, returning');
        return;
    }
    const self = this;
    const definitions = this._definitions;
    const jobQueue = this._jobQueue;
    let jobName;
    if (!extraJob) {
        const parallelJobQueueing = [];
        for (jobName in definitions) {
            if ({}.hasOwnProperty.call(definitions, jobName)) {
                debug('queuing up job to process: [%s]', jobName);
                parallelJobQueueing.push(jobQueueFilling(jobName));
            }
        }
        await Promise.all(parallelJobQueueing);
    }
    else if (definitions[extraJob.attrs.name]) {
        debug('job [%s:%s] was passed directly to processJobs(), locking and running immediately', extraJob.attrs.name, extraJob.attrs._id);
        self._jobsToLock.push(extraJob);
        await lockOnTheFly();
    }
    function shouldLock(name) {
        const jobDefinition = definitions[name];
        let shouldLock = true;
        if (self._lockLimit && self._lockLimit <= self._lockedJobs.length) {
            shouldLock = false;
        }
        if (jobDefinition.lockLimit && jobDefinition.lockLimit <= jobDefinition.locked) {
            shouldLock = false;
        }
        debug('job [%s] lock status: shouldLock = %s', name, shouldLock);
        return shouldLock;
    }
    function enqueueJobs(jobs) {
        if (!Array.isArray(jobs)) {
            jobs = [jobs];
        }
        jobs.forEach((job) => {
            jobQueue.insert(job);
        });
    }
    async function lockOnTheFly() {
        debug('lockOnTheFly: isLockingOnTheFly: %s', self._isLockingOnTheFly);
        if (self._isLockingOnTheFly) {
            debug('lockOnTheFly() already running, returning');
            return;
        }
        self._isLockingOnTheFly = true;
        if (self._jobsToLock.length === 0) {
            debug('no jobs to current lock on the fly, returning');
            self._isLockingOnTheFly = false;
            return;
        }
        const now = new Date();
        const job = self._jobsToLock.pop();
        if (job === undefined) {
            debug('no job was popped from _jobsToLock, extremly unlikely but not impossible concurrency issue');
            self._isLockingOnTheFly = false;
            return;
        }
        if (self._isJobQueueFilling.has(job.attrs.name)) {
            debug('lockOnTheFly: jobQueueFilling already running for: %s', job.attrs.name);
            self._isLockingOnTheFly = false;
            return;
        }
        if (!shouldLock(job.attrs.name)) {
            debug('lock limit hit for: [%s:%s]', job.attrs.name, job.attrs._id);
            self._jobsToLock = [];
            self._isLockingOnTheFly = false;
            return;
        }
        const criteria = {
            _id: job.attrs._id,
            lockedAt: null,
            nextRunAt: job.attrs.nextRunAt,
            disabled: { $ne: true },
        };
        const update = { $set: { lockedAt: now } };
        const resp = await self._collection.findOneAndUpdate(criteria, update, {
            includeResultMetadata: true,
            returnDocument: 'after',
        });
        if (resp?.value) {
            const job = (0, create_job_1.createJob)(self, resp.value);
            debug('found job [%s:%s] that can be locked on the fly', job.attrs.name, job.attrs._id);
            self._lockedJobs.push(job);
            definitions[job.attrs.name].locked++;
            enqueueJobs(job);
            jobProcessing();
        }
        self._isLockingOnTheFly = false;
        await lockOnTheFly();
    }
    async function jobQueueFilling(name) {
        debug('jobQueueFilling: %s isJobQueueFilling: %s', name, self._isJobQueueFilling.has(name));
        self._isJobQueueFilling.set(name, true);
        try {
            if (!shouldLock(name)) {
                debug('lock limit reached in queue filling for [%s]', name);
                return;
            }
            const now = new Date();
            self._nextScanAt = new Date(now.valueOf() + self._processEvery);
            const job = await self._findAndLockNextJob(name, definitions[name]);
            if (job) {
                if (!shouldLock(name)) {
                    debug('lock limit reached before job was returned. Releasing lock on [%s]', name);
                    job.attrs.lockedAt = null;
                    await self.saveJob(job);
                    return;
                }
                debug('[%s:%s] job locked while filling queue', name, job.attrs._id);
                self._lockedJobs.push(job);
                definitions[job.attrs.name].locked++;
                enqueueJobs(job);
                await jobQueueFilling(name);
                jobProcessing();
            }
        }
        catch (error) {
            debug('[%s] job lock failed while filling queue', name, error);
        }
        finally {
            self._isJobQueueFilling.delete(name);
        }
    }
    function jobProcessing() {
        if (jobQueue.length === 0) {
            return;
        }
        const now = new Date();
        const job = jobQueue.returnNextConcurrencyFreeJob(definitions);
        debug('[%s:%s] about to process job', job.attrs.name, job.attrs._id);
        if (!job.attrs.nextRunAt || job.attrs.nextRunAt <= now) {
            debug('[%s:%s] nextRunAt is in the past, run the job immediately', job.attrs.name, job.attrs._id);
            runOrRetry();
        }
        else {
            const runIn = job.attrs.nextRunAt - now;
            const MAX_TIMEOUT = Math.pow(2, 31) - 1;
            if (runIn > MAX_TIMEOUT) {
                const checkInterval = Math.min(MAX_TIMEOUT, 24 * 60 * 60 * 1000);
                debug('[%s:%s] nextRunAt exceeds setTimeout limit (%d > %d), scheduling periodic check in %d ms', job.attrs.name, job.attrs._id, runIn, MAX_TIMEOUT, checkInterval);
                setTimeout(() => {
                    enqueueJobs(job);
                }, checkInterval);
            }
            else {
                debug('[%s:%s] nextRunAt is in the future, calling setTimeout(%d)', job.attrs.name, job.attrs._id, runIn);
                setTimeout(jobProcessing, runIn);
            }
        }
        function runOrRetry() {
            if (self._processInterval) {
                const job = jobQueue.pop();
                const jobDefinition = definitions[job.attrs.name];
                if (jobDefinition.concurrency > jobDefinition.running && self._runningJobs.length < self._maxConcurrency) {
                    const lockDeadline = new Date(Date.now() - jobDefinition.lockLifetime);
                    if (!job.attrs.lockedAt || job.attrs.lockedAt < lockDeadline) {
                        debug('[%s:%s] job lock has expired, freeing it up', job.attrs.name, job.attrs._id);
                        self._lockedJobs.splice(self._lockedJobs.indexOf(job), 1);
                        jobDefinition.locked--;
                        setImmediate(jobProcessing);
                        return;
                    }
                    self._runningJobs.push(job);
                    jobDefinition.running++;
                    debug('[%s:%s] processing job', job.attrs.name, job.attrs._id);
                    job
                        .run()
                        .then((job) => processJobResult(job))
                        .catch((error) => {
                        return job.pulse.emit('error', error);
                    });
                }
                else {
                    debug('[%s:%s] concurrency preventing immediate run, pushing job to top of queue', job.attrs.name, job.attrs._id);
                    enqueueJobs(job);
                }
            }
        }
    }
    function processJobResult(job) {
        const { name } = job.attrs;
        if (!self._runningJobs.includes(job)) {
            debug('[%s] callback was called, job must have been marked as complete already', job.attrs._id);
            throw new error_1.JobError(`callback already called - job ${name} already marked complete`);
        }
        self._runningJobs.splice(self._runningJobs.indexOf(job), 1);
        if (definitions[name].running > 0) {
            definitions[name].running--;
        }
        self._lockedJobs.splice(self._lockedJobs.indexOf(job), 1);
        if (definitions[name].locked > 0) {
            definitions[name].locked--;
        }
        jobProcessing();
    }
};
exports.processJobs = processJobs;
//# sourceMappingURL=process-jobs.js.map