// src/route/auth.route.js
import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.post("/auth/register", register);
logger.info("Auth route: POST /auth/register");

router.post("/auth/login", login);
logger.info("Auth route: POST /auth/login");

export default router;
