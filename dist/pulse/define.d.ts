import { Job, JobAttributesData } from '../job';
export declare enum JobPriority {
    highest = 20,
    high = 10,
    normal = 0,
    low = -10,
    lowest = -20
}
export interface DefineOptions {
    concurrency?: number;
    lockLimit?: number;
    lockLifetime?: number;
    priority?: keyof typeof JobPriority;
    shouldSaveResult?: boolean;
    attempts?: number;
    backoff?: {
        type: 'exponential' | 'fixed';
        delay: number;
    };
}
export type Processor<T extends JobAttributesData> = (job: Job<T>, done: (error?: Error, result?: unknown) => void) => unknown | Promise<unknown>;
export type DefineMethod = <T extends JobAttributesData>(name: string, processor: Processor<T>, options?: DefineOptions) => void;
export declare const define: DefineMethod;
