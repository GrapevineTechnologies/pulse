"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touch = void 0;
const utils_1 = require("../utils");
const touch = async function (progress) {
    if (progress && (progress < 0 || progress > 100)) {
        throw new utils_1.JobError('Progress must be a number between 0 and 100');
    }
    this.attrs.lockedAt = new Date();
    this.attrs.progress = progress;
    return this.save();
};
exports.touch = touch;
//# sourceMappingURL=touch.js.map