import { project } from "../Models/project";
import Project from "../Models/project";
import Post from "../Models/post";
import { projectInput, postInput } from "../../interfaces/projectInterfaces/project";

export default class ProjectManager {
    static async createProject({
        project,
        userId
    }:{
        project: projectInput,
        userId: string
    }){
        const newProject = new Project({user_id: userId, ...project})
        try{
            const savedProject = await newProject.save();
            console.log(savedProject);
            return savedProject;
        } catch (error: any) {
            console.error('Error saving project to DB:', error);
            throw new Error("Project save to DB failed: Critical error!!")
        }
    }

    static async createPost({
        post,
        project_id,
        user_id
    }:{
        post: postInput,
        project_id?: string | undefined,
        user_id: string
    }){
        const newPost = new Post({
            user_id,
            project_id: project_id,
            ...post
        })

        try{
            const savedPost = await newPost.save();
            console.log("SAVED POST:", savedPost);
            if(!savedPost){
                console.log("Post save to DB failed: Critical error!!");
                throw new Error("Post save to DB failed: Critical error!!")
            }
            return savedPost;
        } catch (error: any) {
            console.error('Error saving post to DB:', error);
            throw new Error("Post save to DB failed: Critical error!!")
        }

    }
}