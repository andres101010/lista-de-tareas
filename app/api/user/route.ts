import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
export async function GET(){
    const res = await conn.query('SELECT * FROM user')

    console.log("res", res)
    await conn.end();
    return NextResponse.json("Usuarios")
}


export async function POST(body:type) {
    
}