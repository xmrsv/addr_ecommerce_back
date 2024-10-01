// src/utils/logger.js

import { format } from "date-fns"; // Importa la función format de date-fns

// Función para obtener la marca de tiempo actual en formato legible
function getTimestamp() {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
}

// Objeto logger con métodos para cada tipo de log
export const logger = {
    info: message => {
        const filename = new Error().stack
            .split("\n")[2]
            .split("/")
            .pop()
            .split(":")[0];
        console.log(
            `\x1b[36m[${getTimestamp()}] INFO\x1b[0m - ${filename}: ${message}`
        ); // Cian
    },
    warn: message => {
        const filename = new Error().stack
            .split("\n")[2]
            .split("/")
            .pop()
            .split(":")[0];
        console.warn(
            `\x1b[33m[${getTimestamp()}] WARN\x1b[0m - ${filename}: ${message}`
        ); // Amarillo
    },
    error: message => {
        const filename = new Error().stack
            .split("\n")[2]
            .split("/")
            .pop()
            .split(":")[0];
        console.error(
            `\x1b[31m[${getTimestamp()}] ERROR\x1b[0m - ${filename}: ${message}`
        ); // Rojo
    },
};
