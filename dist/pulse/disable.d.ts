import { Filter } from 'mongodb';
export type DisableMethod = (query?: Filter<unknown>) => Promise<number>;
export declare const disable: DisableMethod;
