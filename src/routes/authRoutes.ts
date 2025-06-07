import { Router } from "express";
import { RegisterUser, LoginUser, hydrateUser }  from "../services/Controllers/authController";
import userAuth from "../middleware/userAuth";

const authRouter = Router();

authRouter.post('/register', RegisterUser);
authRouter.post('/login', LoginUser);
authRouter.post('/hydrate', userAuth,hydrateUser);

export default authRouter;