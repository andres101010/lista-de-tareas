import UseTasks from "@/hooks/UseTasks"
import { sendTask } from "@/services/tasks";

const InputTasks = ({handleShowInputTask, id, setShowInputTask, getDataTasks}:{handleShowInputTask: ()=> void; id:string; setShowInputTask: (value: boolean) => void; getDataTasks:()=> void }) => {

    const {
        handleTask,
        valueTask,
        setValueTask,
    } = UseTasks();

    const sendNewTask = async () => {
        try {
             await sendTask(id,valueTask)
        
            setValueTask({date:"", content:"", link:""})
            setShowInputTask(true)
            getDataTasks()
        } catch (error) {
            console.log("error", error)
            setValueTask({date:"", content:"", link:""})
            throw error
        }
    }


  return (
  <div className='flex flex-col items-center justify-center bg-amber-500 h-[350px] w-[300px] p-4 rounded-md'>
    <h1 className="text-amber-950 mb-2.5, text-2xl font-bold">Agrega Una Tarea</h1>
   <input className='mb-4 p-3 w-full h-12 text-lg rounded bg-amber-200 text-amber-950'  type="date" name='date' placeholder="Date" onChange={handleTask} value={valueTask.date}/>
   <input className='mb-4 p-3 w-full h-20 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='content' placeholder="Content" onChange={handleTask} value={valueTask.content}/>
   <input className='mb-4 p-3 w-full h-20 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='link' placeholder="Link" onChange={handleTask} value={valueTask.link}/>
   <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5 p-1 cursor-pointer hover:bg-amber-700 hover:text-amber-300 w-full' onClick={()=>sendNewTask()}>Guardar</button>
   <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5 p-1 cursor-pointer hover:bg-amber-700 hover:text-amber-300 w-full' onClick={()=>handleShowInputTask()}>Atras</button>
  </div>
  )
}

export default InputTasks