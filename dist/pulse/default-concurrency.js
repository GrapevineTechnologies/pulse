"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConcurrency = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:defaultConcurrency');
const defaultConcurrency = function (concurrency) {
    debug('Pulse.defaultConcurrency(%d)', concurrency);
    this._defaultConcurrency = concurrency;
    return this;
};
exports.defaultConcurrency = defaultConcurrency;
//# sourceMappingURL=default-concurrency.js.map