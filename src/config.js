import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "autorack.proxy.rlwy.net";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD =
  process.env.DB_PASSWORD || "RewRoydddmEcnHDSTfXIQRhOqvXNWCvn";
export const DB_DATABASE = process.env.DB_DATABASE || "railway";
export const DB_PORT = process.env.DB_PORT || 14812;
export const JWT_SECRET = process.env.JWT_SECRET_KEY || "my super secret key";
