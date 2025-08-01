import { Job } from '.';
export interface JobOptions {
    timezone?: string;
    startDate?: Date | number;
    endDate?: Date | number;
    skipDays?: string;
    skipImmediate?: boolean;
}
export type RepeatEveryMethod = (interval: string, options?: JobOptions) => Job;
export declare const repeatEvery: RepeatEveryMethod;
