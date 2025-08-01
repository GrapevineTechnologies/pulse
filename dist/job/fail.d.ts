import { Job } from '.';
export type FailMethod = (reason: string | Error) => Job;
export declare const fail: FailMethod;
