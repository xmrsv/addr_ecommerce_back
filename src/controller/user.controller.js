// Ruta: src/controller/user.controller.js
// Nombre del archivo: user.controller.js

import User from '../model/User.js';

// Función para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ message: "Error al obtener los usuarios." });
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({ message: "Error al obtener el usuario." });
  }
};

// Función para actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, firstName, lastName, enabled } = req.body;
    const updatedUser = await User.update(
      { username, email, firstName, lastName, enabled },
      { where: { id: userId } }
    );
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json({ message: "Usuario actualizado." });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ message: "Error al actualizar el usuario." });
  }
};

// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUserCount = await User.destroy({ where: { id: userId } });
    if (deletedUserCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json({ message: "Usuario eliminado." });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: "Error al eliminar el usuario." });
  }
};

// Función para aprobar un usuario
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // El middleware authorize ya ha verificado que el usuario es administrador

    // Actualizar el usuario
    const updatedUser = await User.update(
      { enabled: true },
      { where: { id: userId } }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario aprobado." });
  } catch (error) {
    console.error("Error al aprobar el usuario:", error);
    return res.status(500).json({ message: "Error al aprobar el usuario." });
  }
};