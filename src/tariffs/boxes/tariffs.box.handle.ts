import knex from "#postgres/knex.js";
import { TariffsBoxRecord, TariffsBoxResponse, TarriffsBoxTransformer } from "#types/index.js";

export async function tariffsBoxHandle(response: TariffsBoxResponse) {
    const transaction = await knex.transaction();

    const today = new Date().toLocaleDateString("en-CA");

    try {
        const tariffs: TariffsBoxRecord[] = TarriffsBoxTransformer.transform(response.warehouseList, today);
    
        // Idempotent 
        await transaction.insert(
            tariffs.map(tariff => ({ ...tariff, updatedAt: today })))
            .into("tariffs_box")
            .onConflict(["warehouseName", "date"])
            .merge([
                "date",
                "warehouseName",
                "geoName",
                "boxDeliveryBase",
                "boxDeliveryCoefExpr",
                "boxDeliveryLiter",
                "boxDeliveryMarketplaceBase",
                "boxDeliveryMarketplaceCoefExpr",
                "boxDeliveryMarketplaceLiter",
                "boxStorageBase",
                "boxStorageCoefExpr",
                "boxStorageLiter",
                "updatedAt"
            ]);
        
        await transaction.commit();

        console.info("Tariffs boxes updated");
    } catch (error) {
        // If anything goes wrong we roll it back
        await transaction.rollback();

        throw error;
    }
}