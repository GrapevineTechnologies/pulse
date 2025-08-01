"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxConcurrency = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:maxConcurrency');
const maxConcurrency = function (concurrency) {
    debug('Pulse.maxConcurrency(%d)', concurrency);
    this._maxConcurrency = concurrency;
    return this;
};
exports.maxConcurrency = maxConcurrency;
//# sourceMappingURL=max-concurrency.js.map