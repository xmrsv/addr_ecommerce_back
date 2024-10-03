// src/app.js

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./utils/logger.js";

import orderRoutes from "./route/order.route.js";
import indexRoutes from "./route/index.route.js";
import productRoutes from "./route/product.route.js";
import authRoutes from "./route/auth.route.js";

const app = express();

// Middlewares
logger.info("Configuring middlewares...");
app.use(morgan("dev"));
logger.info("Morgan middleware configured.");
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
logger.info("CORS middleware configured.");
app.use(express.json());
logger.info("Express.json middleware configured.");
app.use(cookieParser());
logger.info("Cookie parser middleware configured.");

// Routes
logger.info("Configuring routes...");
app.use("/", indexRoutes);
logger.info("Index routes configured.");
app.use("/api", orderRoutes);
logger.info("Order routes configured.");
app.use("/api", productRoutes);
logger.info("Product routes configured.");
app.use("/api", authRoutes);
logger.info("Authentication routes configured.");

app.use((req, res) => {
    logger.warn("Route not found.");
    res.status(404).json({ message: "Not found" });
});

logger.info("Application configured successfully.");
export default app;
