import { AnyError, Collection, Db } from 'mongodb';
import { Pulse } from '.';
export type MongoMethod = (mdb: Db, collection?: string, cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void) => Pulse;
export declare const mongo: MongoMethod;
