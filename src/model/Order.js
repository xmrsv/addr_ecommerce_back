// Ruta: src/model/Order.js
// Nombre del archivo: Order.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcionOrden: {
    type: DataTypes.TEXT
  },
  fechaSalida: {
    type: DataTypes.DATE
  },
  fechaEntrega: {
    type: DataTypes.DATE
  },
  ordenId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Order; // Exporta el modelo Order antes de definir las relaciones