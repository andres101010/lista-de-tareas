import { NextResponse, NextRequest  } from "next/server";
import { conn } from "@/libs/mysql";
import { Tareas } from "@/interface/interface";
import { NewTarea } from "@/type/types";
export async function GET(request: NextRequest, context: { params: { id: string } }){
    try {
        const { params } = context;
        const { id } = await params;
        const sql = `SELECT * FROM tarea WHERE id_user = ?`;

        
        const result = await conn.query<Tareas[]>(sql, [id]);

         await conn.end()
        
        return NextResponse.json(result ?? []);
    } catch (error) {
        console.log("error", error)
        await conn.end()
        return NextResponse.json({message:"Error", error})
    }
}

export async function POST(req: Request, context: { params: { id: string } }){
    try {
        const { params } = context;
        const { id } = await params;
        const body: NewTarea = await req.json()
        const { date, content } = body;
        const sql = 'INSERT INTO tarea (date, content, id_user) VALUES (?,?,?)'
        await conn.query(sql,[date, content, id])
        await conn.end()
        

        return NextResponse.json({message:"Tarea Guardada Con Exito!!!"})
    } catch (error) {
        console.log("error", error)
        await conn.end()
       
        return NextResponse.json({message:"Error", error})
    }
}

export async function PUT(req: Request, context: {params:{id:string}}){
    try {

        const {params} = context;

        const {id} = await params

        const body = await req.json();

        console.log("body", body)

        const sql = 'UPDATE tarea SET date = ?, content = ?, status = ? WHERE idtarea = ?';
        const values = [body.date, body.content, body.status, id]

        const response = await conn.query(sql, values)
        await conn.end()
        

        return NextResponse.json({message:"Editado Con Exito !!!", response})
        
    } catch (error) {
        console.log("error", error)
        await conn.end()
        

        return NextResponse.json({message:"Algo Salio mal :("}, {status:500})
    }
}

export async function DELETE(req: Request, context:{params:{id:string}}) {
    try {
       
        const { params } = context;
        const { id } = await params;

        const sql = 'DELETE FROM tarea WHERE idtarea = ?'

        const res = await conn.query(sql,[id])
        await conn.end()
        
        return NextResponse.json({message:"Eliminado Con Exito", res})

    } catch (error) {
        console.log("error", error)
        await conn.end()
        
        return NextResponse.json({message:"Algo salio mal"}, {status:500})
    }
}