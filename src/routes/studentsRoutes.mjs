import  express  from "express";
import { studentsController } from "../controllers/studentsController.mjs";
import { authenticate } from "../middlewares/authMiddleware.mjs";

export const studentsRoutes = express.Router();

//Ruta protegida
studentsRoutes.get('/',authenticate,studentsController.getAll)
