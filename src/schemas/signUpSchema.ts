import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast 2 char")
    .max(20,"username must be no more 20 char")
    .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(6, {message: 'Password must be atleast 6 Characters'}) 
})