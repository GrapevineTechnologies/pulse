import { Job } from '../job';
export type ProcessDbResultMethod = (job: Job, result: any) => Promise<Job>;
export type SaveJobMethod = (job: Job) => Promise<Job>;
export declare const saveJob: SaveJobMethod;
