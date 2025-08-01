import { Job } from '.';
export type ScheduleMethod = (time: string | Date) => Job;
export declare const schedule: ScheduleMethod;
