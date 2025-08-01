"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongo = function (mdb, collection, cb) {
    this._mdb = mdb;
    this.dbInit(collection, cb);
    return this;
};
exports.mongo = mongo;
//# sourceMappingURL=mongo.js.map