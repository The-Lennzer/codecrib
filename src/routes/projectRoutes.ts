import { Router } from "express";

import { createProject } from "../services/Controllers/projectController";
import userAuth from "../middleware/userAuth";

const projectRouter = Router();

projectRouter.post('/create', userAuth, createProject);

export default projectRouter;