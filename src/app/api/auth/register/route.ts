import { NextResponse,NextRequest } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";


export async function POST(req:NextRequest) {
    try {
        const {email,password} = await req.json()

        if(!email || !password){
            return NextResponse.json(
                {error:"email and password dis required"},
                {status:400}
            )
        }

        await connectToDatabase();

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error:"email is already registered"},
                {status:400}
            )
        }

        await User.create(
            {
                email,
                password
            }
        )

        return NextResponse.json(
            {message:"user registered successfully"},
            {status:201}
        )
        
    } catch (error) {
        return NextResponse.json(
            {error:"failed to register user"},
            {status:500}
        )
        
    }
}