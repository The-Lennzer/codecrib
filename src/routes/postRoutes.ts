import { Router } from "express";

import { createPost } from "../services/Controllers/projectController";
import userAuth from "../middleware/userAuth";

const postRouter = Router();

postRouter.post('/create', userAuth, createPost);

export default postRouter;