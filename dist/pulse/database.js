"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const mongodb_1 = require("mongodb");
const utils_1 = require("../utils");
const has_mongo_protocol_1 = require("./has-mongo-protocol");
const debug = (0, debug_1.default)('pulse:database');
const database = async function (url, collection, options = {}, cb) {
    if (!(0, has_mongo_protocol_1.hasMongoProtocol)(url)) {
        url = 'mongodb://' + url;
    }
    collection = collection || 'pulseJobs';
    const client = await mongodb_1.MongoClient.connect(url, options).catch((error) => {
        debug('error connecting to MongoDB using collection: [%s]', collection);
        if (cb) {
            cb(error, null);
        }
        else {
            throw new utils_1.BaseError(error);
        }
    });
    if (!client) {
        throw new utils_1.BaseError('Mongo Client is undefined');
    }
    this._db = client;
    this._mdb = client.db();
    this.dbInit(collection, cb);
    return this;
};
exports.database = database;
//# sourceMappingURL=database.js.map