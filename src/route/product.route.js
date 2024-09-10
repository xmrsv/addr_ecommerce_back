// Ruta: src/route/product.route.js
// Nombre del archivo: product.route.js

import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controller/product.controller.js";

const router = Router();

// GET all Products
router.get("/products", getProducts);

// GET a Product by ID
router.get("/products/:productId", getProductById);

// CREATE a new Product
router.post("/products", createProduct);

// UPDATE a Product
router.put("/products/:productId", updateProduct);

// DELETE a Product
router.delete("/products/:productId", deleteProduct);

export default router;