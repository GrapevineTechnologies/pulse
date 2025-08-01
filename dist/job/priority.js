"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priority = void 0;
const utils_1 = require("../utils");
const priority = function (priority) {
    this.attrs.priority = (0, utils_1.parsePriority)(priority);
    return this;
};
exports.priority = priority;
//# sourceMappingURL=priority.js.map