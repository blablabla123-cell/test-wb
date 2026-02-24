import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { TariffsBoxRecord } from "#types/tarrifs.box.response.type.js";
import { google } from "googleapis";

export async function updateSheetsConfig() {
    try {
        
        console.info("Updating google sheets config");
        
        if(!env.GOOGLE_SHEET_ID_LIST) {
            throw new Error("GOOGLE_SHEET_ID_LIST is not defined");
        }

        if(!env.GOOGLE_SERVICE_ACCOUNT) {
            throw new Error("GOOGLE_SERVICE_ACCOUNT is not defined");
        }

        if(!env.GOOGLE_API_SCOPE) {
            throw new Error("GOOGLE_API_SCOPE is not defined");
        }

        const sortBy = env.GOOGLE_SHEETS_SORT_BY || "boxDeliveryCoefExpr";

        console.info(`Sorting by [${sortBy}]`);
        
        const data = await knex("tariffs_box").select("*").orderBy([
            { column: "updatedAt", order: "desc" },
        ]).orderByRaw(`"${sortBy}"::numeric asc`);

        for(const sheetId of env.GOOGLE_SHEET_ID_LIST) {
            const auth = new google.auth.GoogleAuth({
                credentials: JSON.parse(Buffer.from(env.GOOGLE_SERVICE_ACCOUNT, "base64").toString()),
                scopes: [env.GOOGLE_API_SCOPE],
            });

            const sheets = google.sheets({ version: "v4", auth });

            console.info(`Clearing sheet [${sheetId}]`);
            // Clear the sheet
            await sheets.spreadsheets.values.clear({
                spreadsheetId: sheetId,
                range: "A:Z",
            });
            
            console.info(`Updating sheet [${sheetId}]`);
            // Update the data
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: "A:Z",
                requestBody: {
                    values: sheetStructure(data),
                },
                valueInputOption: "USER_ENTERED",
            });
        }

    } catch (error) {
        throw error;
    }
}

function sheetStructure(data: TariffsBoxRecord[]) {
    return [
        [
            'Date',
            'Warehouse name',
            'Geo name',
            'Box delivery base',
            'Box delivery coef expr',
            'Box delivery liter',
            'Box delivery marketplace base',
            'Box delivery marketplace coef expr',
            'Box delivery marketplace liter',
            'Box storage base',
            'Box storage coef expr',
            'Box storage liter',
        ],
        ...data.map(record => [
            record.date,
            record.warehouseName,
            record.geoName,
            record.boxDeliveryBase,
            record.boxDeliveryCoefExpr,
            record.boxDeliveryLiter,
            record.boxDeliveryMarketplaceBase,
            record.boxDeliveryMarketplaceCoefExpr,
            record.boxDeliveryMarketplaceLiter,
            record.boxStorageBase,
            record.boxStorageCoefExpr,
            record.boxStorageLiter,
        ]),
    ];
}