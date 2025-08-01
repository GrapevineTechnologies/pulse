"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enable = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:enable');
const enable = async function (query = {}) {
    debug('attempting to enable all jobs matching query', query);
    try {
        const { modifiedCount } = await this._collection.updateMany(query, {
            $set: { disabled: false },
        });
        debug('%s jobs enabled', modifiedCount);
        return modifiedCount;
    }
    catch (error) {
        debug('error trying to mark jobs as `enabled`');
        throw error;
    }
};
exports.enable = enable;
//# sourceMappingURL=enable.js.map