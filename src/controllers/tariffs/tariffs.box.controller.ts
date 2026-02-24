import { fetchUpdateTariffsBox } from "#services/tariffs_box.fetch.update.service.js";

export async function tariffsBoxController(_req: any, res: any) {
    try {
        console.info("Testing route");

        await fetchUpdateTariffsBox();

        res.status(200).json({ ok: true, message: "Box tariffs updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Failed to update box tariffs" });
    }
}