import { Pulse } from '.';
import { Job, JobAttributesData } from '../job';
export declare const schedule: <T extends JobAttributesData>(this: Pulse, when: string | Date, names: string | string[], data?: T) => Promise<Job<T>> | Promise<Job<{}>[]>;
export type ScheduleMethod = typeof schedule;
