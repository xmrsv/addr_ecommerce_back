// Ruta: src/route/auth.route.js
// Nombre del archivo: auth.route.js

import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;
