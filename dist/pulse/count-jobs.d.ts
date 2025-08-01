import { CountDocumentsOptions, Filter } from 'mongodb';
import { Pulse } from '.';
export declare const countJobsRepo: (this: Pulse, query?: {}, options?: {}) => Promise<number>;
export type CountJobsMethod = (query?: Filter<any>, options?: CountDocumentsOptions | undefined) => Promise<number>;
export declare const countJobs: (this: Pulse, query?: {}, options?: {}) => Promise<number>;
