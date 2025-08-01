"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const job_1 = require("../job");
const debug = (0, debug_1.default)('pulse:create');
const create = function (name, data) {
    debug('Pulse.create(%s, [Object])', name);
    const priority = this._definitions[name] ? this._definitions[name].priority : 0;
    const shouldSaveResult = this._definitions[name] ? this._definitions[name].shouldSaveResult || false : false;
    const attempts = this._definitions[name] ? this._definitions[name].attempts || 0 : 0;
    const backoff = attempts
        ? this._definitions[name]
            ? this._definitions[name].backoff || { type: 'exponential', delay: 1000 }
            : { type: 'exponential', delay: 1000 }
        : undefined;
    const job = new job_1.Job({
        name,
        data,
        type: 'normal',
        priority,
        shouldSaveResult,
        attempts,
        backoff,
        pulse: this,
    });
    return job;
};
exports.create = create;
//# sourceMappingURL=create.js.map