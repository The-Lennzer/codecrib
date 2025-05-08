import { Router } from "express";
import { RegisterUser, LoginUser }  from "../services/Controllers/authController";

const authRouter = Router();

authRouter.post('/register', RegisterUser);
authRouter.post('/login', LoginUser);

export default authRouter;