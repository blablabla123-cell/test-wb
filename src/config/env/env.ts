import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),
    BASE_URL: z.union([z.undefined(), z.string().url()]),
    API_KEY: z.union([z.undefined(), z.string()]),
    GOOGLE_SERVICE_ACCOUNT: z.union([z.undefined(), z.string()]),
    GOOGLE_SHEETS_SORT_BY: z.union([z.undefined(), z.string()]),
    GOOGLE_API_SCOPE: z.union([z.undefined(), z.string()]),
    GOOGLE_SHEET_ID_LIST: z.string().min(1).transform((value) => value.split(",").map((id) => id.trim()).filter(id => id.length > 0)),
});

const env = envSchema.parse({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    GOOGLE_SERVICE_ACCOUNT: process.env.GOOGLE_SERVICE_ACCOUNT,
    GOOGLE_SHEETS_SORT_BY: process.env.GOOGLE_SHEETS_SORT_BY,
    GOOGLE_API_SCOPE: process.env.GOOGLE_API_SCOPE,
    GOOGLE_SHEET_ID_LIST: process.env.GOOGLE_SHEET_ID_LIST,
});

export default env;
