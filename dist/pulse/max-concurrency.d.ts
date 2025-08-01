import { Pulse } from '.';
export type MaxConcurrencyMethod = (concurrency: number) => Pulse;
export declare const maxConcurrency: MaxConcurrencyMethod;
