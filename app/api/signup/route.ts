import { NextResponse } from "next/server";
import { user as singIn } from "@/interface/interface";
import bcrypt from 'bcryptjs';
import { conn } from "@/libs/mysql";
import { user } from "@/interface/interface";
export async function POST(req: Request) {
    try {
      const body: singIn = await req.json();
      const {name, lastName, email, password } = body;

      const userDB = await conn.query<user[]>('SELECT * FROM user WHERE email = ?', [email])
      console.log("userDB", userDB)
      
      if(userDB.length > 0) return NextResponse.json({message:"Correo ya en uso..."},{status:500})

      const hash = await bcrypt.hash(password, 10);
  
      const sql = 'INSERT INTO user (name, lastName, email, password) VALUES (?, ?, ?, ?)';
      await conn.query(sql, [name, lastName, email, hash]);
  
      await conn.end();

      return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
  
    } catch (error) {
      console.error("err", error);
      await conn.end();

      return NextResponse.json({ message: "Algo salió mal..." }, { status: 500 });
    }
  }