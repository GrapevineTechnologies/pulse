import { Job, JobAttributesData } from '../job';
export type CreateMethod = <T extends JobAttributesData>(name: string, data: T) => Job<T>;
export declare const create: CreateMethod;
