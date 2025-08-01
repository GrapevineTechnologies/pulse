import { Job } from '.';
export type TouchMethod = (progress?: number) => Promise<Job>;
export declare const touch: TouchMethod;
