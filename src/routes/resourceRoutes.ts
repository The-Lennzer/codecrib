import { Router } from "express";
import { getThatResource } from "../services/Controllers/resourceController";
import userAuth from "../middleware/userAuth";

const resourceRouter = Router();

resourceRouter.get('/resource', userAuth, getThatResource);

export default resourceRouter;