"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEvery = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const human_interval_1 = tslib_1.__importDefault(require("human-interval"));
const debug = (0, debug_1.default)('pulse:processEvery');
const processEvery = function (time) {
    debug('Pulse.processEvery(%d)', time);
    this._processEvery = (0, human_interval_1.default)(time);
    return this;
};
exports.processEvery = processEvery;
//# sourceMappingURL=process-every.js.map