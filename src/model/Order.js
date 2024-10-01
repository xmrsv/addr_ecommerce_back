// src/model/Order.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

logger.info("Defining Order model...");

const Order = sequelize.define("Order", {
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcionOrden: {
        type: DataTypes.TEXT,
    },
    fechaSalida: {
        type: DataTypes.DATE,
    },
    fechaEntrega: {
        type: DataTypes.DATE,
    },
    ordenId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

logger.info("Order model defined successfully.");

export default Order;
