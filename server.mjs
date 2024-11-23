import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoutes } from './src/routes/authRoutes.mjs';
import { studentsRoutes } from './src/routes/studentsRoutes.mjs';

dotenv.config()
const app = express();

const PORT = process.env.PORT ?? 3000
app.use(express.json());
app.use(cors())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/students",studentsRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
