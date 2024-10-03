// src/model/RolePermission.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

logger.info("Defining RolePermission model...");

const RolePermission = sequelize.define("RolePermission", {
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Roles", // Nombre del modelo Role
            key: "id",
        },
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Permissions", // Nombre del modelo Permission
            key: "id",
        },
    },
});

logger.info("RolePermission model defined successfully.");

export default RolePermission;
