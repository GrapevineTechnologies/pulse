import { Pulse } from '.';
export type ResumeOnRestartMethod = (resume?: boolean) => Pulse;
export declare const resumeOnRestart: ResumeOnRestartMethod;
