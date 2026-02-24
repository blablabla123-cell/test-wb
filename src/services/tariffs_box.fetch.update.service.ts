import { updateSheetsConfig } from "#google/index.js";
import { tariffsBoxFetch, tariffsBoxHandle } from "#tariffs/boxes/index.js";

export async function fetchUpdateTariffsBox() {
        // Get the boxes tariffs
        const result = await tariffsBoxFetch();
        
        await tariffsBoxHandle(result);
        
        await updateSheetsConfig();
}