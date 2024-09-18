import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function GET(){
    const response = NextResponse.json({message:"cookie cleared"})
    response.cookies.set('role', '', { maxAge: -1 }); // Set maxAge to -1 to delete the cookie
    return response;
    
}