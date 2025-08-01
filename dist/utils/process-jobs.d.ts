import { Job } from '../job';
import { Pulse } from '../pulse';
export declare const processJobs: (this: Pulse, extraJob: Job) => Promise<void>;
