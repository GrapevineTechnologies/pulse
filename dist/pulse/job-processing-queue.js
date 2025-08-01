"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobProcessingQueue = void 0;
class JobProcessingQueue {
    _queue;
    constructor() {
        this._queue = [];
    }
    get length() {
        return this._queue.length;
    }
    pop() {
        return this._queue.pop();
    }
    insert(job) {
        const matchIndex = this._queue.findIndex((element) => {
            if (element.attrs.nextRunAt.getTime() <= job.attrs.nextRunAt.getTime()) {
                if (element.attrs.nextRunAt.getTime() === job.attrs.nextRunAt.getTime()) {
                    if (element.attrs.priority >= job.attrs.priority) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        });
        if (matchIndex === -1) {
            this._queue.push(job);
        }
        else {
            this._queue.splice(matchIndex, 0, job);
        }
    }
    push(job) {
        this._queue.push(job);
    }
    returnNextConcurrencyFreeJob(pulseDefinitions) {
        let next;
        for (next = this._queue.length - 1; next > 0; next -= 1) {
            const def = pulseDefinitions[this._queue[next].attrs.name];
            if (def.concurrency > def.running) {
                break;
            }
        }
        return this._queue[next];
    }
}
exports.JobProcessingQueue = JobProcessingQueue;
//# sourceMappingURL=job-processing-queue.js.map