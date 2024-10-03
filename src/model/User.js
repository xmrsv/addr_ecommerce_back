// src/model/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

logger.info("Defining User model...");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/,
        },
    },
});

logger.info("User model defined successfully.");

export default User;
