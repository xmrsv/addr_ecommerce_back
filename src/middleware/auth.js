// Ruta: src/middleware/auth.js
// Nombre del archivo: auth.js

import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT
const authenticate = (req, res, next) => {
  try {
    // Obtener el token de la cookie
    const token = req.cookies.token;

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Agregar la información del usuario al objeto de solicitud
    req.user = decoded;

    // Continuar con la siguiente función de middleware o controlador
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(401).json({ message: "No autorizado" });
  }
};

// Middleware para verificar el rol del usuario
const authorize = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    // Verificar si el rol del usuario está en la lista de roles permitidos
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este recurso." });
    }

    // Continuar con la siguiente función de middleware o controlador
    next();
  };
};

export { authenticate, authorize };
