import { Router } from "express";

import { v1Routes } from "./v1.0/index.js";
import { requestLoggingMiddleware } from "#middlewares/index.js";

export const router = Router();

// API version 1 routes
router.use("/api/v1", requestLoggingMiddleware, v1Routes);

