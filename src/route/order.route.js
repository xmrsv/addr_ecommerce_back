// Ruta: src/route/order.route.js
// Nombre del archivo: order.route.js

import { Router } from "express";
import {
    createOrder,
    deleteOrderById,
    getOrderById,
    getOrders,
    actualizarOrden,
} from "../controller/order.controller.js";

const router = Router();

router.get("/orders", getOrders);
router.get("/orders/:orderId", getOrderById);
router.delete("/orders/:orderId", deleteOrderById);
router.post("/orders", createOrder);
router.put("/orders/:orderId", actualizarOrden);

export default router;
