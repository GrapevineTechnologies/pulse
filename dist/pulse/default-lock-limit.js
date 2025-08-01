"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLockLimit = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:defaultLockLimit');
const defaultLockLimit = function (times) {
    debug('Pulse.defaultLockLimit(%d)', times);
    this._defaultLockLimit = times;
    return this;
};
exports.defaultLockLimit = defaultLockLimit;
//# sourceMappingURL=default-lock-limit.js.map