// src/route/product.route.js

import { Router } from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:productCode", getProductById);
router.post("/products", createProduct);
router.put("/products/:productCode", updateProduct);
router.delete("/products/:productCode", deleteProduct);

export default router;
