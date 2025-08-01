import { Pulse } from '.';
export type DefaultLockLifetimeMethod = (ms: number) => Pulse;
export declare const defaultLockLifetime: DefaultLockLifetimeMethod;
