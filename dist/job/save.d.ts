import { Job } from '.';
export type SaveMethod = () => Promise<Job>;
export declare const save: SaveMethod;
