import { Document, Filter } from 'mongodb';
import { Job } from '.';
export type UniqueMethod<TSchema extends Document = Document> = (filter: Filter<TSchema>, options?: {
    insertOnly: boolean;
}) => Job;
export declare const unique: UniqueMethod;
