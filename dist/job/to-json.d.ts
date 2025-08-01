import { JobAttributes } from '.';
export type ToJsonMethod = () => Partial<JobAttributes>;
export declare const toJson: ToJsonMethod;
