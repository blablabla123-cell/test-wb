import env from "#config/env/env.js";
import { HttpErrorResponse, HttpResponse } from "#types/index.js";

export async function sendHttpRequest<T = any>(
    method: string = "GET", 
    endpoint: string, 
    params?: Array<{ key: string, value: string }>
): Promise<HttpResponse> {
    try {
        if(!env.BASE_URL) {
            throw new Error("BASE_URL is not defined"); 
        }

        if(!env.API_KEY) {
            throw new Error("API_KEY is not defined"); 
        }

        let path = `${env.BASE_URL}/${endpoint}`;

        if(params) {
            path += "?";
            for (const param of params) {
                path += `${param.key}=${param.value}`;
            }
        }

        console.info(`>>>>>>>>>>>>>>>>>>>>>>>>`);
        console.info(`Request to [/${endpoint}]`);
        if(params) {
            console.info(`Path with params: ${path}`);
        }

        const response = await fetch(path, {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": env.API_KEY,
            },
        });

        const json = await response.json();

        if(response.status !== 200) {
            console.error(json);
            return {
                success: false,
                error: json as HttpErrorResponse,
            }
        }

        return {
            success: true,
            data: json["response"]["data"] as T,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}