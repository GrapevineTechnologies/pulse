"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const define_1 = require("../pulse/define");
const utils_1 = require("../utils");
const compute_next_run_at_1 = require("./compute-next-run-at");
const disable_1 = require("./disable");
const enable_1 = require("./enable");
const fail_1 = require("./fail");
const fetch_status_1 = require("./fetch-status");
const is_expired_1 = require("./is-expired");
const is_running_1 = require("./is-running");
const priority_1 = require("./priority");
const remove_1 = require("./remove");
const repeat_at_1 = require("./repeat-at");
const repeat_every_1 = require("./repeat-every");
const run_1 = require("./run");
const save_1 = require("./save");
const schedule_1 = require("./schedule");
const set_shouldsaveresult_1 = require("./set-shouldsaveresult");
const to_json_1 = require("./to-json");
const touch_1 = require("./touch");
const unique_1 = require("./unique");
class Job {
    _lazyBindings = {};
    pulse;
    attrs;
    constructor(options) {
        const { pulse, type, nextRunAt, ...args } = options ?? {};
        this.pulse = pulse;
        args.priority = args.priority === undefined ? define_1.JobPriority.normal : (0, utils_1.parsePriority)(args.priority);
        args.shouldSaveResult = args.shouldSaveResult || false;
        const attrs = {};
        for (const key in args) {
            if ({}.hasOwnProperty.call(args, key)) {
                attrs[key] = args[key];
            }
        }
        this.attrs = {
            ...attrs,
            name: attrs.name || '',
            priority: attrs.priority,
            type: type || 'once',
            nextRunAt: nextRunAt || new Date(),
        };
    }
    get toJSON() {
        return this.bindMethod('toJSON', to_json_1.toJson);
    }
    get computeNextRunAt() {
        return this.bindMethod('computeNextRunAt', compute_next_run_at_1.computeNextRunAt);
    }
    get repeatEvery() {
        return this.bindMethod('repeatEvery', repeat_every_1.repeatEvery);
    }
    get repeatAt() {
        return this.bindMethod('repeatAt', repeat_at_1.repeatAt);
    }
    get disable() {
        return this.bindMethod('disable', disable_1.disable);
    }
    get enable() {
        return this.bindMethod('enable', enable_1.enable);
    }
    get unique() {
        return this.bindMethod('unique', unique_1.unique);
    }
    get schedule() {
        return this.bindMethod('schedule', schedule_1.schedule);
    }
    get priority() {
        return this.bindMethod('priority', priority_1.priority);
    }
    get fail() {
        return this.bindMethod('fail', fail_1.fail);
    }
    get run() {
        return this.bindMethod('run', run_1.run);
    }
    get isRunning() {
        return this.bindMethod('isRunning', is_running_1.isRunning);
    }
    get isExpired() {
        return this.bindMethod('isExpired', is_expired_1.isExpired);
    }
    get save() {
        return this.bindMethod('save', save_1.save);
    }
    get remove() {
        return this.bindMethod('remove', remove_1.remove);
    }
    get touch() {
        return this.bindMethod('touch', touch_1.touch);
    }
    get setShouldSaveResult() {
        return this.bindMethod('setShouldSaveResult', set_shouldsaveresult_1.setShouldSaveResult);
    }
    get fetchStatus() {
        return this.bindMethod('fetchStatus', fetch_status_1.fetchStatus);
    }
    bindMethod(methodName, fn) {
        if (!this._lazyBindings[methodName]) {
            this._lazyBindings[methodName] = fn.bind(this);
        }
        return this._lazyBindings[methodName];
    }
}
exports.Job = Job;
//# sourceMappingURL=index.js.map