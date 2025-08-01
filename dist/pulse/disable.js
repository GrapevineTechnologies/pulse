"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:disable');
const disable = async function (query = {}) {
    debug('attempting to disable all jobs matching query', query);
    try {
        const { modifiedCount } = await this._collection.updateMany(query, {
            $set: { disabled: true },
        });
        debug('%s jobs disabled');
        return modifiedCount;
    }
    catch (error) {
        debug('error trying to mark jobs as `disabled`');
        throw error;
    }
};
exports.disable = disable;
//# sourceMappingURL=disable.js.map