import { dbConnect } from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";
import { success, z } from "zod"
import { usernameValidation } from "@/src/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    if (request.method != 'GET') {
        return Response.json({
                success: false,
                message: 'Method is already taken',
        }, {status: 405 })
    }
    await dbConnect()
    
    try{
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParam )
        if (!result.success) {
            const usenameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usenameErrors?.length > 0 ? usenameErrors.join(', ') : 'Invalid query parameters',
            }, {status: 400})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true})
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken',
            }, {status: 400})
        }
        return Response.json({
                success: true,
                message: 'Username is unique',
        }, {status: 400})

    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status : 500 }
        )
    }
}