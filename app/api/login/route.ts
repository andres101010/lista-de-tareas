import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { userLogin, user } from "@/interface/interface";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/helpers/generateToken";


export async function POST( req: Request) {
    try {
        const body: userLogin = await req.json();
        const {email, password} = body;
        const sql = 'SELECT * FROM user WHERE email=?'
        const resUser = await conn.query<user[]>(sql,[email])
        if(resUser.length == 0) {
            await conn.end();
            return NextResponse.json({message:"No Existe El Usuario"}, {status: 401})
        }

        const user = resUser[0];
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            await conn.end();
            return NextResponse.json({ message: "Contraseña incorrecta" });
        }    

         const payload = { email: email };

         const token = await generateToken(payload);


        const response = NextResponse.json({ success: true, user });


        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60, // 1 hora
          });

        await conn.end();

        return response

    } catch (error) {
        console.log("error", error)
        await conn.end();

        return NextResponse.json({message:"No Hay un Usuario Registrado", error})
    }
}