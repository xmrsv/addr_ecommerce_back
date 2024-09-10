// Ruta: src/app.js
// Nombre del archivo: app.js

import express from "express";
import morgan from "morgan";

import orderRoutes from "./route/order.route.js";
import indexRoutes from "./route/index.route.js";
import productRoutes from "./route/product.route.js"; // Importa las rutas de productos
import cors from "cors";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes); // Registra las rutas de productos

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;