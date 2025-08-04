import { Tareas } from "@/interface/interface"
import { deleteTask } from "@/services/tasks";
import { Dispatch, SetStateAction } from "react";

const CardsTasks = ({tasks, setTasks, handleStatusChange}:{ tasks: Tareas[];  setTasks: Dispatch<SetStateAction<Tareas[]>>;   handleStatusChange: (id: number) => void;}) => {


    const eliminar = async (id: number) => {
        try {
            await deleteTask(id)    
            setTasks(prev => prev.filter(task => task.idtarea !== id))
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }

  return (
    <div className="grid grid-cols-4 gap-4">
        {
            tasks.length > 0 ?

             tasks.map((row,i)=>(
            
                <div key={i} className="bg-amber-900 p-4 rounded shadow-md hover:bg-amber-700 flex flex-col items-center justify-center text-center text-white">
                    <p className="text-lg font-semibold underline">Fecha: {row.date}</p>
                    <p className="text-sm italic text-gray-300">Contenido:</p>
                    <p className="text-base font-medium">{row.content}</p>
                    <p className="text-base font-medium">
                    Link:{" "}
                    <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Ver enlace
                    </a>
                    </p>

                    
                    {/* Checkbox para cambiar el estado */}
                    <label className="flex items-center gap-2">
                        <input 
                        type="checkbox" 
                        checked={row.status === 'completada'} 
                        onChange={() => handleStatusChange(row.idtarea)} 
                        className="w-5 h-5 cursor-pointer"
                        />
                        <span className={`text-base font-bold ${row.status === 'pendiente' ? 'text-red-500' : 'text-green-500'}`}>
                        Estado: {row.status}
                        </span>
                    </label>

                    <div className="flex gap-2 mt-2">
                        {/* <button className="bg-amber-300 px-3 py-1 hover:bg-amber-100 rounded-2xl text-amber-950 font-bold">Editar</button> */}
                        <button className="bg-amber-600 px-3 py-1 hover:bg-amber-400 rounded-2xl font-bold text-white" onClick={()=>eliminar(row.idtarea)}>Borrar</button>
                    </div>
                </div>
             ))

            :
            null
        }
    </div>
  )
}

export default CardsTasks