import { Job } from '.';
export type RepeatAtMethod = (time: string) => Job;
export declare const repeatAt: RepeatAtMethod;
