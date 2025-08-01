import { Document, Filter } from 'mongodb';
export type CancelMethod = (query: Filter<Document>) => Promise<number | undefined>;
export declare const cancel: CancelMethod;
