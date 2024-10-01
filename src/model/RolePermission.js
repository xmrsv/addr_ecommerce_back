// src/model/RolePermission.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RolePermission = sequelize.define("RolePermission", {
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Roles",
            key: "id",
        },
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Permissions",
            key: "id",
        },
    },
});

export default RolePermission;
