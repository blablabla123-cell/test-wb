/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
     await knex.schema.createTable("tariffs_box", table => {
        // No need to hold the id, I guess
        table.string("date", 10).notNullable();
        // Warehouse
        table.string("warehouseName", 255).notNullable();
        table.string("geoName", 255).notNullable();
        // Box storage coefficients
        table.string("boxStorageLiter", 10).notNullable();
        table.string("boxStorageCoefExpr", 10).notNullable();
        table.string("boxStorageBase", 10).notNullable();
        // Box delivery coefficients
        table.string("boxDeliveryMarketplaceLiter", 10).notNullable();
        table.string("boxDeliveryMarketplaceCoefExpr", 10).notNullable();
        table.string("boxDeliveryMarketplaceBase", 10).notNullable();
        table.string("boxDeliveryLiter", 10).notNullable();
        table.string("boxDeliveryCoefExpr", 10).notNullable();
        table.string("boxDeliveryBase", 10).notNullable();
        // Technical information
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());

        // Unique
        table.primary(["warehouseName", "date"]);

        // Indexes
        table.index(["date"]);
        table.index(["warehouseName"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
      await knex.schema.dropTable("tariffs_box");
}
