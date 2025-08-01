import { Filter } from 'mongodb';
export type EnableMethod = (query?: Filter<unknown>) => Promise<number>;
export declare const enable: EnableMethod;
