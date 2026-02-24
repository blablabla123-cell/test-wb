import { HttpErrorResponse } from "./index.js";

export interface HttpResponse<T = any> {
    success: boolean;
    data?: T;
    error?: HttpErrorResponse;
}