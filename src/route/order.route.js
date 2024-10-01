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

// GET all Orders
router.get("/orders", getOrders);

// GET an Order by ID
router.get("/orders/:orderId", getOrderById);

// DELETE an Order by ID
router.delete("/orders/:orderId", deleteOrderById);

// INSERT an Order
router.post("/orders", createOrder);

// UPDATE an Order (replace completely)
router.put("/orders/:orderId", actualizarOrden);

export default router;
