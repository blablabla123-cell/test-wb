import { sendHttpRequest } from "#config/http/http.request.js";
import { HttpMethod, TariffsBoxResponse } from "#types/index.js";


export async function tariffsBoxFetch(): Promise<TariffsBoxResponse> {
    try {
        console.info("Fetching boxes tariffs");

        const response = await sendHttpRequest<TariffsBoxResponse>(HttpMethod.GET, "tariffs/box", [
            {
                key: "date",
                value: new Date().toLocaleDateString("en-CA"),
            }
        ]);

        if(!response.success) {
            throw new Error(response.error?.detail || "Failed to fetch boxes tariffs");
        }
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}