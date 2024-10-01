// src/route/user.route.js

import { Router } from "express";
import { approveUser } from "../controller/user.controller.js";
import { authorize } from "../middleware/auth.js";

const router = Router();

router.put("/users/:userId/approve", authorize(["admin"]), approveUser);

export default router;
