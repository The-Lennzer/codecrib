import { string, z } from "zod";

const registerSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(32),
})

export {
    registerSchema
}