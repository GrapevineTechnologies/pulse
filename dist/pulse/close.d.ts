import { Pulse } from '.';
export type CloseMethod = (option?: {
    force: boolean;
}) => Promise<Pulse>;
export declare const close: CloseMethod;
