"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const remove = async function () {
    return this.pulse.cancel({ _id: this.attrs._id });
};
exports.remove = remove;
//# sourceMappingURL=remove.js.map