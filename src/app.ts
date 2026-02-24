import { migrate } from "#postgres/knex.js";
import env from "#config/env/env.js";
import { CronJob } from "cron";
import{ router } from "#routes/index.js";

import express from "express";
import { errorsMiddleware } from "#middlewares/index.js";
import { fetchUpdateTariffsBox } from "#services/index.js";

const app = express();

app.use(express.json());
app.use("/", router);
app.use(errorsMiddleware);

async function start() {
    await migrate.latest();
    // await seed.run();

    console.info("All migrations and seeds have been run");
    
    app.listen(env.APP_PORT || 4000, () => {
        cronJob.start();
        console.info(`Server is running on port ${env.APP_PORT || 4000}`);
    });
}

// Run every hour
const cronJob = new CronJob("0 * * * *", async () => {
    console.info(`Running cron every hour, time ${new Date().toLocaleTimeString("en-US", { hour12: false })}`);
    await fetchUpdateTariffsBox();
}, null, false, "Europe/Moscow");

await start();