// Ruta: src/validation/user.js
// Nombre del archivo: user.js

// Función para validar el nombre de usuario
export const validateUsername = (username) => {
  // Implementa tu lógica de validación aquí, por ejemplo:
  return username.length >= 3 && username.length <= 20;
};

// Función para validar la contraseña
export const validatePassword = (password) => {
  // Implementa tu lógica de validación aquí, por ejemplo:
  return password.length >= 8;
};

// Función para validar el email
export const validateEmail = (email) => {
  // Implementa tu lógica de validación aquí, por ejemplo:
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Función para validar el nombre
export const validateFirstName = (firstName) => {
  // Implementa tu lógica de validación aquí, por ejemplo:
  return /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/.test(firstName);
};

// Función para validar los apellidos
export const validateLastName = (lastName) => {
  // Implementa tu lógica de validación aquí, por ejemplo:
  return /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/.test(lastName);
};
