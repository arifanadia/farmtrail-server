import { Router } from "express";
import { signUp } from "../controllers/AuthController";

const authRoutes = Router();

authRoutes.post('/signup',signUp)

export default authRoutes;