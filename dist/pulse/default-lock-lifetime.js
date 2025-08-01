"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLockLifetime = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:defaultLockLifetime');
const defaultLockLifetime = function (ms) {
    debug('Pulse.defaultLockLifetime(%d)', ms);
    this._defaultLockLifetime = ms;
    return this;
};
exports.defaultLockLifetime = defaultLockLifetime;
//# sourceMappingURL=default-lock-lifetime.js.map