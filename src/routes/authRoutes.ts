import { Router } from "express";
import { Login, Register } from "../services/Controllers/authController";

const authRouter = Router();

authRouter.post('/auth/register', Register);
authRouter.post('/auth/login', Login);

export default authRouter;