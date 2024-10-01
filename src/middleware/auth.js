// src/middleware/auth.js

import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No autorizado",
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;

        next();
    } catch (error) {
        console.error("Error de autenticación:", error);
        return res.status(401).json({
            message: "No autorizado",
        });
    }
};

const authorize = allowedRoles => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "No autorizado",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "No tienes permiso para acceder a este recurso.",
            });
        }

        next();
    };
};

export { authenticate, authorize };
