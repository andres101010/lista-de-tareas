import { NextResponse, NextRequest  } from "next/server";
import { conn } from "@/libs/mysql";
import { Tareas } from "@/interface/interface";
import { NewTarea } from "@/type/types";
import { ResultSetHeader, FieldPacket } from 'mysql2';

export async function GET(request: NextRequest,   context: { params: Promise<{ id: string }> } ){
    try {
        // const { params } = params;
        const { id } = await context.params;
        // const { id } =   params;
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

export async function POST(req: Request,  context: { params: Promise<{ id: string }> } ){
    try {
        const { id } = await context.params;
        const body: NewTarea = await req.json()
        const { date, content, link } = body;
        const sql = 'INSERT INTO tarea (date, content, link, id_user) VALUES (?,?,?,?)'
        await conn.query(sql,[date, content, link, id])
        await conn.end()
        

        return NextResponse.json({message:"Tarea Guardada Con Exito!!!"})
    } catch (error) {
        console.log("error", error)
        await conn.end()
       
        return NextResponse.json(
            { message: "Error", error },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  
    try {
        const { id } = await context.params;
        const body = await req.json();

        // Validar que haya al menos 1 campo a actualizar
        if (!Object.keys(body).length) {
            return NextResponse.json({ message: "No hay campos para actualizar" }, { status: 400 });
        }

        // Lista de campos válidos para evitar SQL injection
        const camposValidos = ["date", "content", "status", "link"];
        const setParts: string[] = [];
        const values: (string | number)[] = [];


        // Construir dinámicamente el SET
        for (const campo of camposValidos) {
            if (body[campo] !== undefined) {
                setParts.push(`${campo} = ?`);
                values.push(body[campo]);
            }
        }

        // Si no hay campos válidos, salir
        if (setParts.length === 0) {
            return NextResponse.json({ message: "No hay campos válidos para actualizar" }, { status: 400 });
        }

        // Agregar el id al final para el WHERE
        values.push(id);

        // Construir SQL
        const sql = `UPDATE tarea SET ${setParts.join(", ")} WHERE idtarea = ?`;

        const [result] = await conn.query<[ResultSetHeader, FieldPacket[]]>(sql, values);


        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "No se encontró la tarea" }, { status: 404 });
        }

        await conn.end()
        return NextResponse.json({ message: "Editado con éxito" });


    } catch (error) {
        console.error("error", error);
        await conn.end()
        return NextResponse.json({ message: "Algo salió mal :(" }, { status: 500 });
    } finally {
        await conn.end()
         
    }
}

export async function DELETE(req: Request,  context: { params: Promise<{ id: string }> } ) {
    try {
       
        // const { params } = context;
        const { id } = await context.params;

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