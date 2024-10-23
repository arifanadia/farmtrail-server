import { Router } from 'express';
import { register } from '../controllers/AuthController';  
import multer from "multer";

const authRoutes = Router();

authRoutes.post('/signup', register);

export default authRoutes;
