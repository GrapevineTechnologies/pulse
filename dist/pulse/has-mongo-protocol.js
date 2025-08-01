"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMongoProtocol = void 0;
const hasMongoProtocol = function (url) {
    return /mongodb(?:\+srv)?:\/\/.*/.exec(url) !== null;
};
exports.hasMongoProtocol = hasMongoProtocol;
//# sourceMappingURL=has-mongo-protocol.js.map