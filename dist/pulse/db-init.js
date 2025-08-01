"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInit = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('pulse:db_init');
const dbInit = function (collection = 'pulseJobs', cb) {
    debug('init database collection using name [%s]', collection);
    this._collection = this._mdb.collection(collection);
    if (this._resumeOnRestart) {
        this.resumeOnRestart(this._resumeOnRestart);
    }
    if (this._disableAutoIndex) {
        debug('skipping auto index creation');
        this.emit('ready');
        return;
    }
    debug('attempting index creation');
    this._collection
        .createIndex(this._indices, { name: 'findAndLockNextJobIndex' })
        .then(() => {
        debug('index creation success');
        this.emit('ready');
    })
        .catch((error) => {
        debug('index creation failed');
        this.emit('error', error);
        if (cb) {
            cb(error, this._collection);
        }
    });
};
exports.dbInit = dbInit;
//# sourceMappingURL=db-init.js.map