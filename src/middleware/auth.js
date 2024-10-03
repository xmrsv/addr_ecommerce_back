// src/middleware/auth.js
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";
import process from "process";

const authenticate = (req, res, next) => {
    logger.info("Authentication middleware triggered.");
    try {
        const token = req.cookies.token;

        if (!token) {
            logger.warn(
                "No token found in cookies. User is not authenticated."
            );
            return res.status(401).json({
                message: "No autorizado",
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        logger.info(
            `Token verified successfully for user with ID ${payload.userId}.`
        );
        req.user = payload;

        next();
    } catch (error) {
        logger.error(`Authentication error: ${error}`);
        return res.status(401).json({
            message: "No autorizado",
        });
    }
};

const authorize = allowedRoles => {
    return (req, res, next) => {
        logger.info(
            `Authorization middleware triggered for roles: ${allowedRoles.join(", ")}.`
        );

        if (!req.user) {
            logger.warn("User is not authenticated.");
            return res.status(401).json({
                message: "No autorizado",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            logger.warn(
                `User with role ${req.user.role} is not authorized for this route.`
            );
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        logger.info(`User with role ${req.user.role} is authorized.`);
        next();
    };
};

export { authenticate, authorize };
