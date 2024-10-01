// Ruta: src/app.js
// Nombre del archivo: app.js

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import orderRoutes from "./route/order.route.js";
import indexRoutes from "./route/index.route.js";
import productRoutes from "./route/product.route.js";
import authRoutes from "./route/auth.route.js"; // Importa las rutas de autenticación

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:4321" }));
app.use(express.json());
app.use(cookieParser()); // Usa el middleware

// Routes
app.use("/", indexRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes); // Registra las rutas de autenticación

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
