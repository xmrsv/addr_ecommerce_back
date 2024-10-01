// src/main.js

import app from "./app.js";
import { PORT } from "./config.js";
import sequelize from "./config/database.js";
import Order from "./model/Order.js";
import Product from "./model/Product.js";
import OrderItem from "./model/OrderItem.js";
import { logger } from "./utils/logger.js";
import { defineRelations } from "./model/relation.js";

// Define las relaciones entre los modelos
defineRelations();

(async () => {
    try {
        logger.info("Starting server...");
        await sequelize.sync();
        logger.info("Database synchronized.");
        app.listen(PORT, () => {
            logger.info(`Server listening on port ${PORT}.`);
        });
    } catch (error) {
        logger.error(`Error during server initialization: ${error}`);
    }
})();
