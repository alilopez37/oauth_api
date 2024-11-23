import  express  from "express";
import { authController } from "../controllers/authController.mjs";

export const authRoutes = express.Router();

//Ruta pública
authRoutes.post('/logingoogle',authController.loginGoogle)
authRoutes.post('/loginapp',authController.loginApp)