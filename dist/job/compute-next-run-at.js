"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeNextRunAt = void 0;
const tslib_1 = require("tslib");
const parser = tslib_1.__importStar(require("cron-parser"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const human_interval_1 = tslib_1.__importDefault(require("human-interval"));
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const date_js_1 = tslib_1.__importDefault(require("date.js"));
const debug = (0, debug_1.default)('pulse:job');
const computeNextRunAt = function () {
    const interval = this.attrs.repeatInterval;
    const timezone = this.attrs.repeatTimezone;
    const { repeatAt } = this.attrs;
    const previousNextRunAt = this.attrs.nextRunAt || new Date();
    this.attrs.nextRunAt = undefined;
    const dateForTimezone = (date) => {
        const mdate = (0, moment_timezone_1.default)(date);
        if (timezone) {
            mdate.tz(timezone);
        }
        return mdate;
    };
    const computeFromInterval = () => {
        debug('[%s:%s] computing next run via interval [%s]', this.attrs.name, this.attrs._id, interval);
        const dateNow = new Date();
        let lastRun = this.attrs.lastRunAt || dateNow;
        let { startDate, endDate, skipDays } = this.attrs;
        lastRun = dateForTimezone(lastRun).toDate();
        const cronOptions = { currentDate: lastRun };
        if (timezone) {
            cronOptions.tz = timezone;
        }
        try {
            let cronTime = parser.parseExpression(interval, cronOptions);
            let nextDate = cronTime.next().toDate();
            if (nextDate.getTime() === lastRun.getTime() || nextDate.getTime() <= previousNextRunAt.getTime()) {
                cronOptions.currentDate = new Date(lastRun.getTime() + 1000);
                cronTime = parser.parseExpression(interval, cronOptions);
                nextDate = cronTime.next().toDate();
            }
            if (startDate) {
                startDate = moment_timezone_1.default.tz((0, moment_timezone_1.default)(startDate).format('YYYY-MM-DD HH:mm'), timezone).toDate();
                if (startDate > nextDate) {
                    cronOptions.currentDate = startDate;
                    cronTime = parser.parseExpression(interval, cronOptions);
                    nextDate = cronTime.next().toDate();
                }
            }
            if (dateNow > lastRun && skipDays !== null) {
                try {
                    nextDate = new Date(nextDate.getTime() + ((0, human_interval_1.default)(skipDays) ?? 0));
                }
                catch { }
            }
            if (endDate) {
                const endDateDate = moment_timezone_1.default.tz((0, moment_timezone_1.default)(endDate).format('YYYY-MM-DD HH:mm'), timezone).toDate();
                if (nextDate > endDateDate) {
                    nextDate = null;
                }
            }
            this.attrs.nextRunAt = nextDate;
            debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt?.toISOString());
        }
        catch {
            debug('[%s:%s] failed nextRunAt based on interval [%s]', this.attrs.name, this.attrs._id, interval);
            try {
                if (!this.attrs.lastRunAt && (0, human_interval_1.default)(interval)) {
                    this.attrs.nextRunAt = lastRun;
                    debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
                }
                else {
                    this.attrs.nextRunAt = new Date(lastRun.getTime() + ((0, human_interval_1.default)(interval) ?? 0));
                    debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
                }
            }
            catch { }
        }
        finally {
            if (!this.attrs.nextRunAt?.getTime()) {
                this.attrs.nextRunAt = undefined;
                debug('[%s:%s] failed to calculate nextRunAt due to invalid repeat interval', this.attrs.name, this.attrs._id);
                this.fail('failed to calculate nextRunAt due to invalid repeat interval');
            }
        }
    };
    const computeFromRepeatAt = () => {
        const lastRun = this.attrs.lastRunAt || new Date();
        const nextDate = (0, date_js_1.default)(repeatAt);
        const offset = Date.now();
        if (offset === (0, date_js_1.default)(repeatAt, offset).getTime()) {
            this.attrs.nextRunAt = undefined;
            debug('[%s:%s] failed to calculate repeatAt due to invalid format', this.attrs.name, this.attrs._id);
            this.fail('failed to calculate repeatAt time due to invalid format');
        }
        else if (nextDate.getTime() === lastRun.getTime()) {
            this.attrs.nextRunAt = (0, date_js_1.default)('tomorrow at ', repeatAt);
            debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt?.toISOString());
        }
        else {
            this.attrs.nextRunAt = (0, date_js_1.default)(repeatAt);
            debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt?.toISOString());
        }
    };
    if (interval) {
        computeFromInterval();
    }
    else if (repeatAt) {
        computeFromRepeatAt();
    }
    return this;
};
exports.computeNextRunAt = computeNextRunAt;
//# sourceMappingURL=compute-next-run-at.js.map