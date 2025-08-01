import { Job } from '.';
export type RunMethod = () => Promise<Job>;
export declare const run: RunMethod;
