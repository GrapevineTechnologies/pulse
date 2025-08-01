export declare class BaseError extends Error {
    message: string;
    constructor(message: string);
}
export declare class PulseError extends BaseError {
    message: string;
    constructor(message: string);
}
export declare class JobError extends BaseError {
    message: string;
    constructor(message: string);
}
