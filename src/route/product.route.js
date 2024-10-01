// src/route/product.route.js

import { Router } from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
} from "../controller/product.controller.js";
import { logger } from "../utils/logger.js";

const router = Router();

// GET all Products
router.get("/products", getProducts);
logger.info("Product route: GET /products");

// GET a Product by Code
router.get("/products/:productCode", getProductById);
logger.info("Product route: GET /products/:productCode");

// CREATE a new Product
router.post("/products", createProduct);
logger.info("Product route: POST /products");

// UPDATE a Product
router.put("/products/:productCode", updateProduct);
logger.info("Product route: PUT /products/:productCode");

// DELETE a Product
router.delete("/products/:productCode", deleteProduct);
logger.info("Product route: DELETE /products/:productCode");

export default router;
