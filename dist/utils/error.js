"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobError = exports.PulseError = exports.BaseError = void 0;
class BaseError extends Error {
    message;
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BaseError = BaseError;
class PulseError extends BaseError {
    message;
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.PulseError = PulseError;
class JobError extends BaseError {
    message;
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.JobError = JobError;
//# sourceMappingURL=error.js.map