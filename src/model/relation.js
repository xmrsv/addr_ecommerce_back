// src/model/relation.js

import Order from "./Order.js";
import Product from "./Product.js";
import OrderItem from "./OrderItem.js";
import User from "./User.js";
import { logger } from "../utils/logger.js";
import Role from "./Role.js";

logger.info("Defining model relationships...");

export const defineRelations = () => {
    Order.hasMany(OrderItem, { foreignKey: "orderId" });
    logger.info("Order-OrderItem relationship defined.");
    Product.hasMany(OrderItem, { foreignKey: "productId" });
    logger.info("Product-OrderItem relationship defined.");
    OrderItem.belongsTo(Order, { foreignKey: "orderId" });
    logger.info("OrderItem-Order relationship defined.");
    OrderItem.belongsTo(Product, { foreignKey: "productId" });
    logger.info("OrderItem-Product relationship defined.");
    User.belongsTo(Role, { foreignKey: "roleId" });
    logger.info("User-Role relationship defined.");
};

logger.info("Model relationships defined successfully.");
