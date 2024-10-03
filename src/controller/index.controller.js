// src/controller/index.controller.js
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

export const index = (req, res) => {
    logger.info("Index route accessed.");
    res.json({
        message: "Welcome to my APi",
    });
};

export const ping = async (req, res) => {
    logger.info("Ping route accessed.");
    try {
        logger.info("Attempting to authenticate to the database...");
        await sequelize.authenticate();
        logger.info("Database authentication successful.");
        res.json({ result: "pong" });
    } catch (error) {
        logger.error(`Database authentication failed: ${error}`);
        res.status(500).json({ message: "Database connection error" });
    }
};
