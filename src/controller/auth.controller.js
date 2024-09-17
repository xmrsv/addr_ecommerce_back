// Ruta: src/controller/auth.controller.js
// Nombre del archivo: auth.controller.js

import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { 
  validateUsername, 
  validatePassword, 
  validateEmail, 
  validateFirstName, 
  validateLastName 
} from '../validation/user.js'; // Importa las funciones de validación
import { JWT_SECRET } from '../config.js';

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // Validar los datos del usuario
    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'El email no es válido.' });
    }
    if (!validateFirstName(firstName)) {
      return res.status(400).json({ message: 'El nombre no es válido.' });
    }
    if (!validateLastName(lastName)) {
      return res.status(400).json({ message: 'Los apellidos no son válidos.' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      enabled: false
    });

    res.status(201).json({ message: 'Usuario creado correctamente. Espera la aprobación del administrador.' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// Función para iniciar sesión
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la cuenta está habilitada
    if (!user.enabled) {
      return res.status(401).json({ message: 'Tu cuenta aún no ha sido habilitada' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' }); // Reemplaza 'tu_secreto' con una clave secreta

    // Enviar el token en una cookie HttpOnly
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};