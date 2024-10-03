// src/model/OrderItem.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

logger.info("Defining OrderItem model...");

const OrderItem = sequelize.define("OrderItem", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

logger.info("OrderItem model defined successfully.");

export default OrderItem;
