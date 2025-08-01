"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = void 0;
const tslib_1 = require("tslib");
const date_js_1 = tslib_1.__importDefault(require("date.js"));
const schedule = function (time) {
    const d = new Date(time);
    this.attrs.nextRunAt = Number.isNaN(d.getTime()) ? (0, date_js_1.default)(time) : d;
    return this;
};
exports.schedule = schedule;
//# sourceMappingURL=schedule.js.map