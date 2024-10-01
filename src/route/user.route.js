// Ruta: src/route/user.route.js
// Nombre del archivo: user.route.js

import { Router } from "express";
import { approveUser } from "../controller/user.controller.js";
import { authorize } from "../middleware/auth.js"; // Importa el middleware authorize

const router = Router();

router.put("/users/:userId/approve", authorize(["admin"]), approveUser); // Protege la ruta con el middleware authorize

export default router;
