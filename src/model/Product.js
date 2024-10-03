// src/model/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import OrderItem from "./OrderItem.js";
import { logger } from "../utils/logger.js";

logger.info("Defining Product model...");

const Product = sequelize.define("Product", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

Product.hasMany(OrderItem, { foreignKey: "productId" });

logger.info("Product model defined successfully.");

export default Product;
