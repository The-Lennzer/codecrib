import {Request, Response, NextFunction} from 'express';
import ProjectManager from '../Managers/projectManager';
import { projectSchema, postSchema } from '../../validators/project/projectValidator';
import { string } from 'zod';

const createProject = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    console.log("req body: ", req.body);

    const validatedProject = projectSchema.safeParse(req.body);
    if (!validatedProject.success) {
        res.status(400).json({
            error: 'Validation error during project creation!',
            issues: validatedProject.error.issues,
        });
        return;
    }
    const project = validatedProject.data;
    try{
        const newProject = await ProjectManager.createProject({project, userId});
        if(newProject === null) { throw new Error("Project creation failed!"); }
        res.status(201).json(newProject);
    }catch(err){
        console.log("project creation error: ", err);
    }
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.userId as string;
    const post = req.body;
    let project_id = undefined;
    if(req.params.project_id){
        project_id = req.params.project_id as string;
        post.type = 'document';
    } else {
        post.type = 'blog';
    } 

    try{
        const newPost = await ProjectManager.createPost({post, project_id, user_id});
        if(newPost === null) { throw new Error("Post creation failed!"); }
        res.status(201).json(newPost);
    }catch(err){
        console.log("post creation error: ", err);
    }
}


export {
    createProject,
    createPost
}