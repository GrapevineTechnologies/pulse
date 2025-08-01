"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:name');
const name = function (name) {
    debug('Pulse.name(%s)', name);
    this._name = name;
    return this;
};
exports.name = name;
//# sourceMappingURL=name.js.map