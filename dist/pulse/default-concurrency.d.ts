import { Pulse } from '.';
export type DefaultConcurrencyMethod = (concurrency: number) => Pulse;
export declare const defaultConcurrency: DefaultConcurrencyMethod;
