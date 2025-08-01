import { Pulse } from '.';
export type LockLimitMethod = (limit: number) => Pulse;
export declare const lockLimit: LockLimitMethod;
