"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = void 0;
const isExpired = function (useRealStatus = false) {
    if (useRealStatus) {
        this.fetchStatus();
    }
    const definition = this.pulse._definitions[this.attrs.name];
    const lockDeadline = new Date(Date.now() - definition.lockLifetime);
    if (this.attrs.lockedAt && this.attrs.lockedAt < lockDeadline) {
        return true;
    }
    return false;
};
exports.isExpired = isExpired;
//# sourceMappingURL=is-expired.js.map