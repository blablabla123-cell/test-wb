/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("tariffs_box").del();

    await knex("tariffs_box").insert([
        {
            date: new Date().toLocaleDateString("en-CA"),
            warehouseName: "Коледино",
            geoName: "Центральный федеральный округ",
            boxDeliveryBase: "48",
            boxDeliveryCoefExpr: "160",
            boxDeliveryLiter: "11,2",
            boxDeliveryMarketplaceBase: "40",
            boxDeliveryMarketplaceCoefExpr: "125",
            boxDeliveryMarketplaceLiter: "11",
            boxStorageBase: "0,14",
            boxStorageCoefExpr: "115",
            boxStorageLiter: "0,07",
        },
    ]);
}