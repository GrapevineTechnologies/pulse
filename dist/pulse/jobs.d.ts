import { Filter, Sort } from 'mongodb';
import { Pulse } from '.';
import { Job } from '../job';
export declare const getJobsRepo: (this: Pulse, query?: {}, sort?: {}, limit?: number, skip?: number) => Promise<import("mongodb").WithId<import("bson").Document>[]>;
export type JobsMethod = (query?: Filter<any>, sort?: Sort | string, limit?: number, skip?: number) => Promise<Job[]>;
export declare const jobs: JobsMethod;
