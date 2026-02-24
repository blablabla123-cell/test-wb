import { Router } from "express";
import { tariffsRouter } from "./tariffs.router.js";

const v1Routes = Router();

v1Routes.use("/tariffs", tariffsRouter);

export { v1Routes };