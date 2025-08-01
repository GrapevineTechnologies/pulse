"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockLimit = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:locklimit');
const lockLimit = function (limit) {
    debug('Pulse.lockLimit(%d)', limit);
    this._lockLimit = limit;
    return this;
};
exports.lockLimit = lockLimit;
//# sourceMappingURL=lock-limit.js.map