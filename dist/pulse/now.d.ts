import { Job, JobAttributesData } from '../job';
export type NowMethod = <T extends JobAttributesData>(name: string, data?: T) => Promise<Job>;
export declare const now: NowMethod;
