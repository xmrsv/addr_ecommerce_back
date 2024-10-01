// Ruta: src/route/product.route.js
// Nombre del archivo: product.route.js

import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

// GET all Products
router.get("/products", getProducts);

// GET a Product by Code
router.get("/products/:productCode", getProductById); // Cambio: se usa :productCode en lugar de :productId

// CREATE a new Product
router.post("/products", createProduct);

// UPDATE a Product
router.put("/products/:productCode", updateProduct); // Cambio: se usa :productCode en lugar de :productId

// DELETE a Product
router.delete("/products/:productCode", deleteProduct); // Cambio: se usa :productCode en lugar de :productId

export default router;
