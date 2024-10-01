// Ruta: src/main.js
// Nombre del archivo: main.js

import app from "./app.js";
import { PORT } from "./config.js";
import sequelize from "./config/database.js";
import Order from "./model/Order.js";
import Product from "./model/Product.js";
import OrderItem from "./model/OrderItem.js";

// Define las relaciones entre los modelos después de que se hayan definido todos los modelos
Order.hasMany(OrderItem, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" }); // Relación añadida
OrderItem.belongsTo(Product, { foreignKey: "productId" }); // Relación añadida

(async () => {
  try {
    await sequelize.sync(); // Sincroniza los modelos con la base de datos (sin eliminar datos)
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
