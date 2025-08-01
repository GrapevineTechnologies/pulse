import { Pulse } from '.';
import { Job } from '../job';
export declare const findAndLockNextJob: (this: Pulse, jobName: string, definition: any) => Promise<Job | undefined>;
