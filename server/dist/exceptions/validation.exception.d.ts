import { HttpException } from "@nestjs/common";
export declare class ValidationException extends HttpException {
    constructor(response: any, status: any);
}
