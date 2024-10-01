// src/model/Order.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

export default Order;
