import sequelize from "../config/database.js"; // Importa la instancia de Sequelize

export const index = (req, res) => {
  res.json({ message: "Welcome to my API" });
};

export const ping = async (req, res) => {
  try {
    await sequelize.authenticate(); // Verifica la conexión a la base de datos
    res.json({ result: "pong" });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).json({ message: "Database connection error" });
  }
};
