import { Job, JobAttributesData } from '../job';
import { JobOptions } from '../job/repeat-every';
export type EveryMethod = <T extends JobAttributesData>(interval: string, names: string | string[], data?: T, options?: JobOptions) => Promise<Job | Job[]>;
export declare const every: EveryMethod;
