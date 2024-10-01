// src/controller/index.controller.js

import sequelize from "../config/database.js";

export const index = (req, res) => {
    res.json({
        message: "¡Bienvenido a mi API!",
    });
};

export const ping = async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            result: "pong",
        });
    } catch (error) {
        console.error("Error al conectarse a la base de datos:", error);
        res.status(500).json({
            message: "Error de conexión a base de datos",
        });
    }
};
