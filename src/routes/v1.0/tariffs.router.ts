
import { tariffsBoxController } from "#controllers/tariffs/index.js";
import { Router } from "express";


export const tariffsRouter = Router();

// Web app routes
tariffsRouter.get("/box", tariffsBoxController);
