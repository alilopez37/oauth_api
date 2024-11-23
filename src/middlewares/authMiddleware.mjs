import { configApp } from "../config/configApp.mjs";
import axios from "axios";
import jwt from "jsonwebtoken";

// Middleware para autenticación dual
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Intentar validar como JWT propio
    const decoded = jwt.verify(token, configApp.jwt_secret);
    console.log(decoded);
    
    return next();
  } catch (err) {
    console.log("JWT validation failed, trying Google OAuth...");
  }

  try {
    // Intentar validar como token de Google

    // Google recomienda usar este endpoint para validar tokens
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
    );

    console.log(response.data);
    return next();
  } catch (error) {
    console.error("Google token validation failed:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
 