import { Job } from '../job';
declare class JobProcessingQueue {
    protected _queue: Job[];
    constructor();
    get length(): number;
    pop(this: JobProcessingQueue): Job<import("../job").JobAttributesData> | undefined;
    insert(this: JobProcessingQueue, job: Job): void;
    push(this: JobProcessingQueue, job: Job): void;
    returnNextConcurrencyFreeJob(this: JobProcessingQueue, pulseDefinitions: any): Job<import("../job").JobAttributesData>;
}
export { JobProcessingQueue };
