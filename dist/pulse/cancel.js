"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:cancel');
const cancel = async function (query) {
    debug('attempting to cancel all Pulse jobs', query);
    try {
        const { deletedCount } = await this._collection.deleteMany(query);
        this.emit('cancel', deletedCount);
        debug('%s jobs cancelled', deletedCount);
        return deletedCount;
    }
    catch (error) {
        debug('error trying to delete jobs from MongoDB');
        throw error;
    }
};
exports.cancel = cancel;
//# sourceMappingURL=cancel.js.map