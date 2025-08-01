"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pulse = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const human_interval_1 = tslib_1.__importDefault(require("human-interval"));
const cancel_1 = require("./cancel");
const close_1 = require("./close");
const count_jobs_1 = require("./count-jobs");
const create_1 = require("./create");
const database_1 = require("./database");
const db_init_1 = require("./db-init");
const default_concurrency_1 = require("./default-concurrency");
const default_lock_lifetime_1 = require("./default-lock-lifetime");
const default_lock_limit_1 = require("./default-lock-limit");
const define_1 = require("./define");
const disable_1 = require("./disable");
const drain_1 = require("./drain");
const enable_1 = require("./enable");
const every_1 = require("./every");
const find_and_lock_next_job_1 = require("./find-and-lock-next-job");
const job_processing_queue_1 = require("./job-processing-queue");
const jobs_1 = require("./jobs");
const lock_limit_1 = require("./lock-limit");
const max_concurrency_1 = require("./max-concurrency");
const mongo_1 = require("./mongo");
const name_1 = require("./name");
const now_1 = require("./now");
const process_every_1 = require("./process-every");
const purge_1 = require("./purge");
const resume_on_restart_1 = require("./resume-on-restart");
const save_job_1 = require("./save-job");
const schedule_1 = require("./schedule");
const sort_1 = require("./sort");
const start_1 = require("./start");
const stop_1 = require("./stop");
class Pulse extends events_1.EventEmitter {
    _lazyBindings = {};
    _defaultConcurrency;
    _defaultLockLifetime;
    _defaultLockLimit;
    _definitions;
    _findAndLockNextJob = find_and_lock_next_job_1.findAndLockNextJob;
    _indices;
    _disableAutoIndex;
    _resumeOnRestart;
    _isLockingOnTheFly;
    _isJobQueueFilling;
    _jobQueue;
    _jobsToLock;
    _lockedJobs;
    _runningJobs;
    _lockLimit;
    _maxConcurrency;
    _mongoUseUnifiedTopology;
    _name;
    _processEvery;
    _ready;
    _sort;
    _db;
    _mdb;
    _collection;
    _nextScanAt;
    _processInterval;
    _readyAt;
    constructor(config = {}, cb) {
        super();
        this._name = config.name;
        this._processEvery = ((0, human_interval_1.default)(config.processEvery) ?? (0, human_interval_1.default)('5 seconds'));
        this._defaultConcurrency = config.defaultConcurrency || 5;
        this._maxConcurrency = config.maxConcurrency || 20;
        this._defaultLockLimit = config.defaultLockLimit || 0;
        this._lockLimit = config.lockLimit || 0;
        this._definitions = {};
        this._runningJobs = [];
        this._lockedJobs = [];
        this._jobQueue = new job_processing_queue_1.JobProcessingQueue();
        this._defaultLockLifetime = config.defaultLockLifetime || 10 * 60 * 1000;
        this._sort = config.sort || { nextRunAt: 1, priority: -1 };
        this._indices = {
            name: 1,
            ...this._sort,
            priority: -1,
            lockedAt: 1,
            nextRunAt: 1,
            disabled: 1,
        };
        this._disableAutoIndex = config.disableAutoIndex === true;
        this._resumeOnRestart = config.resumeOnRestart !== false;
        this._isLockingOnTheFly = false;
        this._isJobQueueFilling = new Map();
        this._jobsToLock = [];
        this._ready = new Promise((resolve) => {
            this.once('ready', resolve);
        });
        this._readyAt = new Date();
        this.init(config, cb);
    }
    get define() {
        return this.bindMethod('define', define_1.define);
    }
    get every() {
        return this.bindMethod('every', every_1.every);
    }
    get processEvery() {
        return this.bindMethod('processEvery', process_every_1.processEvery);
    }
    get cancel() {
        return this.bindMethod('cancel', cancel_1.cancel);
    }
    get close() {
        return this.bindMethod('close', close_1.close);
    }
    get create() {
        return this.bindMethod('create', create_1.create);
    }
    get dbInit() {
        return this.bindMethod('dbInit', db_init_1.dbInit);
    }
    get defaultConcurrency() {
        return this.bindMethod('defaultConcurrency', default_concurrency_1.defaultConcurrency);
    }
    get defaultLockLifetime() {
        return this.bindMethod('defaultLockLifetime', default_lock_lifetime_1.defaultLockLifetime);
    }
    get defaultLockLimit() {
        return this.bindMethod('defaultLockLimit', default_lock_limit_1.defaultLockLimit);
    }
    get disable() {
        return this.bindMethod('disable', disable_1.disable);
    }
    get enable() {
        return this.bindMethod('enable', enable_1.enable);
    }
    get jobs() {
        return this.bindMethod('jobs', jobs_1.jobs);
    }
    get countJobs() {
        return this.bindMethod('countJobs', count_jobs_1.countJobs);
    }
    get lockLimit() {
        return this.bindMethod('lockLimit', lock_limit_1.lockLimit);
    }
    get maxConcurrency() {
        return this.bindMethod('maxConcurrency', max_concurrency_1.maxConcurrency);
    }
    get name() {
        return this.bindMethod('name', name_1.name);
    }
    get now() {
        return this.bindMethod('now', now_1.now);
    }
    get purge() {
        return this.bindMethod('purge', purge_1.purge);
    }
    get saveJob() {
        return this.bindMethod('saveJob', save_job_1.saveJob);
    }
    get schedule() {
        return this.bindMethod('schedule', schedule_1.schedule);
    }
    get sort() {
        return this.bindMethod('sort', sort_1.sort);
    }
    get start() {
        return this.bindMethod('start', start_1.start);
    }
    get stop() {
        return this.bindMethod('stop', stop_1.stop);
    }
    get drain() {
        return this.bindMethod('drain', drain_1.drain);
    }
    get mongo() {
        return this.bindMethod('mongo', mongo_1.mongo);
    }
    get database() {
        return this.bindMethod('database', database_1.database);
    }
    get resumeOnRestart() {
        return this.bindMethod('resumeOnRestart', resume_on_restart_1.resumeOnRestart);
    }
    get getJobsRepo() {
        return this.bindMethod('getJobsRepo', jobs_1.getJobsRepo);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    init(config, cb) {
        if (config.mongo) {
            this.mongo(config.mongo, config.db ? config.db.collection : undefined, cb);
            if (config.mongo.s && config.mongo.topology && config.mongo.topology.s) {
                this._mongoUseUnifiedTopology = Boolean(config.mongo.topology.s.options.useUnifiedTopology);
            }
        }
        else if (config.db) {
            this.database(config.db.address, config.db.collection, config.db.options, cb);
        }
    }
    bindMethod(methodName, fn) {
        if (!this._lazyBindings[methodName]) {
            this._lazyBindings[methodName] = fn.bind(this);
        }
        return this._lazyBindings[methodName];
    }
}
exports.Pulse = Pulse;
//# sourceMappingURL=index.js.map