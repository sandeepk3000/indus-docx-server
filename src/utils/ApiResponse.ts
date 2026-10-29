import type { Request, Response } from "express"

class ApiResponse {
    public readonly success: boolean;
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data: unknown | null;
    constructor(req: Request, res: Response, statusCode: number, message: string, data: unknown = null, success: boolean) {
        this.success = success
        this.message = message
        this.statusCode = statusCode
        this.data = data
    }
}

export default ApiResponse;