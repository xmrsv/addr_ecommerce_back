// src/validation/user.js

export const validateUsername = username => {
    return username.length >= 3 && username.length <= 20;
};

export const validatePassword = password => {
    return password.length >= 8;
};

export const validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateFirstName = firstName => {
    return /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/.test(firstName);
};

export const validateLastName = lastName => {
    return /^[a-zA-Z\sáéíóúüñÁÉÍÓÚÜÑ'-]+$/.test(lastName);
};
