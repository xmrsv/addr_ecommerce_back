// src/config/database.js

import { Sequelize } from "sequelize";
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "./../config.js";
import { logger } from "../utils/logger.js";

logger.info("Connecting to the database...");
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
});

// Verificar la conexión a la base de datos
(async () => {
    try {
        await sequelize.authenticate();
        logger.info("Database connection successful.");
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
})();

export default sequelize;
