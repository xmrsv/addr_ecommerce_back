// src/controller/auth.controller.js

import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    validateUsername,
    validatePassword,
    validateEmail,
    validateFirstName,
    validateLastName,
} from "../validation/user.js";
import { JWT_SECRET } from "../config.js";
import { logger } from "../utils/logger.js";

export const register = async (req, res) => {
    try {
        logger.info("User registration process started.");
        const { username, password, email, firstName, lastName } = req.body;
        logger.info(`Received registration request for user: ${username}`);

        if (!validateUsername(username)) {
            logger.warn(`Invalid username: ${username}`);
            return res.status(400).json({
                message: "Username must be between 3 and 20 characters.",
            });
        }

        if (!validatePassword(password)) {
            logger.warn(`Invalid password for user: ${username}`);
            return res.status(400).json({
                message: "Password must be at least 8 characters long.",
            });
        }

        if (!validateEmail(email)) {
            logger.warn(`Invalid email: ${email}`);
            return res.status(400).json({
                message: "Invalid email address.",
            });
        }

        if (!validateFirstName(firstName)) {
            logger.warn(`Invalid first name: ${firstName}`);
            return res.status(400).json({
                message: "Invalid first name.",
            });
        }

        if (!validateLastName(lastName)) {
            logger.warn(`Invalid last name: ${lastName}`);
            return res.status(400).json({
                message: "Invalid last name.",
            });
        }

        const existingUser = await User.findOne({
            where: { username },
        });

        if (existingUser) {
            logger.warn(`Username already exists: ${username}`);
            return res.status(400).json({
                message: "Username already exists.",
            });
        }

        logger.info("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        logger.info("Password hashed successfully.");

        const fullName = `${firstName} ${lastName}`;

        logger.info(`Creating new user: ${username}`);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            fullName,
            enabled: false,
        });
        logger.info(`User created successfully: ${newUser.id}`);

        res.status(201).json({
            message:
                "User created successfully. Please wait for admin approval.",
            newUser,
        });
    } catch (error) {
        logger.error("Error during user registration:", error);
        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

export const login = async (req, res) => {
    try {
        logger.info("Login process started.");
        const { username, password } = req.body;
        logger.info(`Received login request for user: ${username}`);

        const user = await User.findOne({
            where: { username },
        });

        if (!user) {
            logger.warn(`User not found: ${username}`);
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        logger.info("Comparing passwords...");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Invalid password for user: ${username}`);
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        if (!user.enabled) {
            logger.warn(`Account disabled for user: ${username}`);
            return res.status(401).json({
                message: "Account disabled.",
            });
        }

        logger.info("Generating JWT token...");
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1d",
        });
        logger.info("JWT token generated successfully.");

        logger.info("Setting cookie...");
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        logger.info("Cookie set successfully.");

        res.status(200).json({
            message: "Login successful.",
        });
    } catch (error) {
        logger.error("Error during user login:", error);
        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
};
