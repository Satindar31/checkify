
/**
 * # Check interface
 * ---
 * Use like `Check[]` for an array of checks
 */
interface Check {
    id: string;
    name: string;
    url: string;
    createdAt: DateConstructor;
    updated: DateConstructor;
    up: boolean;
    status: string;
    response: number;
    errorMsg: string | undefined;
    error: string | undefined
}

export type {
    Check
}