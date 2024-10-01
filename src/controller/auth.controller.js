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

export const register = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        if (!validateUsername(username)) {
            return res.status(400).json({
                message:
                    "El nombre de usuario debe tener entre 3 y 20 caracteres.",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "La contraseña debe tener al menos 8 caracteres.",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "El email no es válido.",
            });
        }

        if (!validateFirstName(firstName)) {
            return res.status(400).json({
                message: "El nombre no es válido.",
            });
        }

        if (!validateLastName(lastName)) {
            return res.status(400).json({
                message: "Los apellidos no son válidos.",
            });
        }

        const existingUser = await User.findOne({
            where: { username },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El nombre de usuario ya está en uso.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const fullName = `${firstName} ${lastName}`;

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            fullName,
            enabled: false,
        });

        res.status(201).json({
            message:
                "Usuario creado correctamente. Espera la aprobación del administrador.",
            newUser,
        });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({
                message: "Credenciales inválidas",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Credenciales inválidas",
            });
        }

        if (!user.enabled) {
            return res.status(401).json({
                message: "Cuenta inhabilitada",
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
