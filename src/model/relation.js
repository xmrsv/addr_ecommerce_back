import Order from "./Order";
import Product from "./Product";
import OrderItem from "./OrderItem";

export const defineRelations = () => {
    Order.hasMany(OrderItem, { foreignKey: "orderId" });
    Product.hasMany(OrderItem, { foreignKey: "productId" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId" });
    OrderItem.belongsTo(Product, { foreignKey: "productId" });
};
