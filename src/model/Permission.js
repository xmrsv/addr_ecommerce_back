// src/model/Permission.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permission = sequelize.define("Permission", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
});

export default Permission;
