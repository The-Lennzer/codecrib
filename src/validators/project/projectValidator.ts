import { title } from "process";
import {string, z} from "zod";

const projectSchema = z.object({ 
    title: z.string(),
    description: z.string(),
    colab_status: z.boolean().default(false),
    project_size: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]).default(1),
    percentage_complete: z.number().min(0).max(100).default(0),    
    is_public: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    status: z.enum(['active', 'completed', 'archived']).default('active'),
})

const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    type: z.enum(['blog', 'document']),
    is_public: z.boolean().default(true),
})

export {
    projectSchema,
    postSchema
}