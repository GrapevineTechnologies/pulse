interface FetchStatusResponse {
    status: boolean;
    reason?: string;
    lastRunAt?: Date;
    lockedAt?: Date;
    lastFinishedAt?: Date;
}
export type FetchStatusMethod = () => Promise<FetchStatusResponse>;
export declare const fetchStatus: FetchStatusMethod;
export {};
