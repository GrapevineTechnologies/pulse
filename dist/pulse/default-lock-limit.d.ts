import { Pulse } from '.';
export type DefaultLockLimitMethod = (times: number) => Pulse;
export declare const defaultLockLimit: DefaultLockLimitMethod;
