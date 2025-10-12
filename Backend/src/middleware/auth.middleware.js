import jwt from "jsonwebtoken";
import { handleErrorClient } from "../Handlers/responseHandlers.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return handleErrorClient(res, 401, "Acceso denegado. No se proporcionó token.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return handleErrorClient(res, 401, "Acceso denegado. Token malformado.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;      // todo el payload 
    req.userId = payload.id; // ID directo del usuario

    next();
  } catch (error) {
    return handleErrorClient(res, 401, "Token inválido o expirado.", error.message);
  }
}
