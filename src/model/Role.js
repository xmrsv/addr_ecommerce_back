// src/model/Role.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default Role;
