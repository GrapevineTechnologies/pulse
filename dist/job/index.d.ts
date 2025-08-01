import * as mongodb from 'mongodb';
import { Pulse } from '../pulse';
import { ComputeNextRunAtMethod } from './compute-next-run-at';
import { DisableMethod } from './disable';
import { EnableMethod } from './enable';
import { FailMethod } from './fail';
import { FetchStatusMethod } from './fetch-status';
import { IsExpiredMethod } from './is-expired';
import { IsRunningMethod } from './is-running';
import { PriorityMethod } from './priority';
import { RemoveMethod } from './remove';
import { RepeatAtMethod } from './repeat-at';
import { RepeatEveryMethod } from './repeat-every';
import { RunMethod } from './run';
import { SaveMethod } from './save';
import { ScheduleMethod } from './schedule';
import { SetShouldSaveResultMethod } from './set-shouldsaveresult';
import { ToJsonMethod } from './to-json';
import { TouchMethod } from './touch';
import { UniqueMethod } from './unique';
type Modify<T, R> = Omit<T, keyof R> & R;
export interface JobAttributesData {
    [key: string]: any;
}
export interface JobAttributes<T extends JobAttributesData = JobAttributesData> {
    _id: mongodb.ObjectId;
    pulse: Pulse;
    type: string;
    name: string;
    disabled?: boolean;
    progress?: number;
    nextRunAt?: Date | null;
    lockedAt?: Date | null;
    priority: number | string;
    data: T;
    uniqueQuery?: any;
    uniqueOpts?: {
        insertOnly: boolean;
    };
    repeatInterval?: string;
    repeatTimezone?: string | null;
    repeatAt?: string;
    lastRunAt?: Date;
    runCount?: number;
    lastFinishedAt?: Date;
    startDate?: Date | number | null;
    endDate?: Date | number | null;
    skipDays?: string | null;
    finishedCount?: number;
    failReason?: string;
    failCount?: number;
    failedAt?: Date;
    lastModifiedBy?: string;
    shouldSaveResult?: boolean;
    attempts?: number;
    backoff?: {
        type: 'exponential' | 'fixed';
        delay: number;
    };
    result?: unknown;
}
declare class Job<T extends JobAttributesData = JobAttributesData> {
    private _lazyBindings;
    pulse: Pulse;
    attrs: JobAttributes<T>;
    constructor(options: Modify<JobAttributes<T>, {
        _id?: mongodb.ObjectId;
    }>);
    get toJSON(): ToJsonMethod;
    get computeNextRunAt(): ComputeNextRunAtMethod;
    get repeatEvery(): RepeatEveryMethod;
    get repeatAt(): RepeatAtMethod;
    get disable(): DisableMethod;
    get enable(): EnableMethod;
    get unique(): UniqueMethod;
    get schedule(): ScheduleMethod;
    get priority(): PriorityMethod;
    get fail(): FailMethod;
    get run(): RunMethod;
    get isRunning(): IsRunningMethod;
    get isExpired(): IsExpiredMethod;
    get save(): SaveMethod;
    get remove(): RemoveMethod;
    get touch(): TouchMethod;
    get setShouldSaveResult(): SetShouldSaveResultMethod;
    get fetchStatus(): FetchStatusMethod;
    private bindMethod;
}
export { Job };
