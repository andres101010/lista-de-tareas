"use client"
import { IdProp } from "@/type/types";
import UseTasks from "@/hooks/UseTasks";
import { useEffect } from "react";
import { getTasks } from "@/services/tasks"
import InputTasks from "./InputTasks";
import CardsTasks from "./CardsTasks";
import Welcome from "./Welcome";

const Tasks = ({id}: IdProp) => {
 
  const {
    tasks,
    setTasks,

    showInputTask,
    setShowInputTask,

    handleShowInputTask,

    handleStatusChange
  } = UseTasks();

  const getDataTasks = async () => {
    try {
        const response = await getTasks(id)
        setTasks(response)
    } catch (error) {
        console.log("error", error)
        throw error
    }
  }

  useEffect(()=>{
    getDataTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <div className="flex items-center justify-center mb-2">
       <Welcome />
      </div>
        {
            !showInputTask ? 
            <InputTasks handleShowInputTask={handleShowInputTask} id={id} setShowInputTask={setShowInputTask}/>
            :
            <>
            <div className="mb-3.5">
                <button className="bg-amber-900 text-white px-4 py-2 w-full rounded hover:bg-amber-400 cursor-pointer" onClick={()=>handleShowInputTask()}>Nueva Tarea</button>
            </div>
            <div>
                {
                    tasks.length == 0 ? 
                    <div>
                        <h1 className=" text-amber-800 font-bold font-stretch-extra-condensed text-3xl">Sin Tareas...</h1>
                    </div>
                    :
                    <CardsTasks tasks={tasks} setTasks={setTasks} handleStatusChange={handleStatusChange}/>
                }
            </div>
            </>      
        }
    </div>
  )
}

export default Tasks