// src/route/user.route.js
import { Router } from "express";
import { approveUser } from "../controller/user.controller.js";
import { authorize } from "../middleware/auth.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.put("/users/:userId/approve", authorize(["admin"]), approveUser);
logger.info("User route: PUT /users/:userId/approve");

export default router;
