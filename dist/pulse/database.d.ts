import { AnyError, Collection, MongoClientOptions } from 'mongodb';
import { Pulse } from '.';
export type DatabaseMethod = (this: Pulse, url: string, collection?: string, options?: MongoClientOptions, cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void) => Promise<Pulse | void>;
export declare const database: DatabaseMethod;
