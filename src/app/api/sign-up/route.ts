import { dbConnect } from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/src/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        await UserModel
    } catch (error) {
        console.error('Error Registering user', error)
        return Response.json(
            {
                success: false,
                message: 'Error Registering user'
            },
            {
                status: 500
            }
        )
    }
}