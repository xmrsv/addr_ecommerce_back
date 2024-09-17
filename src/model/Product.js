// Ruta: src/model/Product.js
// Nombre del archivo: Product.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import OrderItem from './OrderItem.js';

const Product = sequelize.define('Product', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  productCode: { // Nuevo campo para el código del producto
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Asegúrate de que el código sea único
  }
});

Product.hasMany(OrderItem, { foreignKey: 'productId' });

export default Product;