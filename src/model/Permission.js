// src/model/Permission.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

logger.info("Defining Permission model...");

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

logger.info("Permission model defined successfully.");

export default Permission;
