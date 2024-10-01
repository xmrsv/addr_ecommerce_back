// src/controller/user.controller.js

import User from "../model/User.js";
import { logger } from "../utils/logger.js";

export const getUsers = async (req, res) => {
    try {
        logger.info("Fetching all users...");
        const users = await User.findAll();
        logger.info(`Found ${users.length} users.`);
        res.json(users);
    } catch (error) {
        logger.error(`Error fetching users: ${error}`);
        return res.status(500).json({ message: "Error fetching users." });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        logger.info(`Fetching user with ID ${userId}...`);
        const user = await User.findByPk(userId);

        if (!user) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ message: "User not found." });
        }

        logger.info(`User with ID ${userId} found.`);
        res.json(user);
    } catch (error) {
        logger.error(`Error fetching user with ID ${userId}: ${error}`);
        return res.status(500).json({ message: "Error fetching user." });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        logger.info(`Updating user with ID ${userId}...`);
        const { username, email, firstName, lastName, enabled } = req.body;

        logger.info(
            `Updating user with data: ${JSON.stringify({
                username,
                email,
                firstName,
                lastName,
                enabled,
            })}`
        );

        const updatedUser = await User.update(
            { username, email, firstName, lastName, enabled },
            { where: { id: userId } }
        );

        if (updatedUser[0] === 0) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ message: "User not found." });
        }

        logger.info(`User with ID ${userId} updated successfully.`);
        res.json({ message: "User updated." });
    } catch (error) {
        logger.error(`Error updating user with ID ${userId}: ${error}`);
        return res.status(500).json({ message: "Error updating user." });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        logger.info(`Deleting user with ID ${userId}...`);

        const deletedUserCount = await User.destroy({ where: { id: userId } });

        if (deletedUserCount === 0) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ message: "User not found." });
        }

        logger.info(`User with ID ${userId} deleted successfully.`);
        res.json({ message: "User deleted." });
    } catch (error) {
        logger.error(`Error deleting user with ID ${userId}: ${error}`);
        return res.status(500).json({ message: "Error deleting user." });
    }
};

export const approveUser = async (req, res) => {
    try {
        const { userId } = req.params;
        logger.info(`Approving user with ID ${userId}...`);

        // El middleware authorize ya ha verificado que el usuario es administrador

        const updatedUser = await User.update(
            { enabled: true },
            { where: { id: userId } }
        );

        if (updatedUser[0] === 0) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ message: "User not found." });
        }

        logger.info(`User with ID ${userId} approved successfully.`);
        res.status(200).json({ message: "User approved." });
    } catch (error) {
        logger.error(`Error approving user with ID ${userId}: ${error}`);
        return res.status(500).json({ message: "Error approving user." });
    }
};
