"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:sort');
const sort = function (query) {
    debug('Pulse.sort([Object])');
    this._sort = query;
    return this;
};
exports.sort = sort;
//# sourceMappingURL=sort.js.map