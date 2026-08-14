import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(10, {message: "content must be atleast 10 char"})
    .max(300, {message: "username must be no more 20 char"}),
    password: z.string(),
})