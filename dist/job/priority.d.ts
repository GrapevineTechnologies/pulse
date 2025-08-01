import { Job } from '.';
export type PriorityMethod = (priority: string) => Job;
export declare const priority: PriorityMethod;
