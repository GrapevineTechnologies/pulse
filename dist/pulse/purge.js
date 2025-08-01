"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purge = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:purge');
const purge = async function () {
    const definedNames = Object.keys(this._definitions);
    debug('Pulse.purge(%o)', definedNames);
    return this.cancel({ name: { $not: { $in: definedNames } } });
};
exports.purge = purge;
//# sourceMappingURL=purge.js.map