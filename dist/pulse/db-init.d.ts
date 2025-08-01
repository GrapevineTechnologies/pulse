import { AnyError, Collection } from 'mongodb';
export type DbInitMethod = (collection?: string, cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void) => void;
export declare const dbInit: DbInitMethod;
