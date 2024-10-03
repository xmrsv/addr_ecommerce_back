// src/route/order.route.js
import { Router } from "express";
import {
    createOrder,
    deleteOrderById,
    getOrderById,
    getOrders,
    actualizarOrden,
} from "../controller/order.controller.js";
import { logger } from "../utils/logger.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// GET all Orders
router.get("/orders", authenticate, getOrders);
logger.info("Order route: GET /orders");

// GET an Order by ID
router.get("/orders/:orderId", authenticate, getOrderById);
logger.info("Order route: GET /orders/:orderId");

// DELETE an Order by ID
router.delete("/orders/:orderId", authenticate, deleteOrderById);
logger.info("Order route: DELETE /orders/:orderId");

// INSERT an Order
router.post("/orders", authenticate, createOrder);
logger.info("Order route: POST /orders");

// UPDATE an Order (replace completely)
router.put("/orders/:orderId", authenticate, actualizarOrden);
logger.info("Order route: PUT /orders/:orderId");

export default router;
