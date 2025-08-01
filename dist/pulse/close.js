"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:close');
const close = async function (option) {
    debug('close db connection for this pulse instance');
    const closeOptions = {
        force: false,
        ...option,
    };
    try {
        if (this._db) {
            await this._db.close(closeOptions.force);
        }
        return this;
    }
    catch (error) {
        debug('error trying to close db connection to');
        throw error;
    }
};
exports.close = close;
//# sourceMappingURL=close.js.map