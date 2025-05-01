import {useState} from 'react'
import { Tareas } from '@/interface/interface';
import { editTask } from '@/services/tasks';
const UseTasks = () => {
    const [tasks, setTasks] = useState<Tareas[]>([])
    const [valueTask, setValueTask] = useState({date:"", content:""});
    const [showInputTask, setShowInputTask] = useState(true)

    const handleShowInputTask = () => {
        setShowInputTask(!showInputTask)
    }

    const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setValueTask(prev => ({...prev, [name]: value}))
    }

    // const handleStatusChange = (id: number) => {
    //   setTasks(prevTasks =>
    //     prevTasks.map(task =>
    //       task.idtarea === id ? { ...task, status: task.status === 'pendiente' ? 'completada' : 'pendiente' } : task
    //     )
    //   );
    // };

    const handleStatusChange = async (id: number) => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.idtarea === id) {
            const updatedTask = {
              ...task,
              status: task.status === 'pendiente' ? 'completada' : 'pendiente'
            };
            try {
              // Llamar a la API con la tarea actualizada
              editTask(id, updatedTask);
              return updatedTask;
            } catch (error) {
              console.log("error", error)
              throw error
            }
          }
          return task;
        });
    
        return updatedTasks;
      });
    };
    

  return {
    tasks,
    setTasks,

    handleTask,
    valueTask,
    setValueTask,
    showInputTask,
    setShowInputTask,
    handleShowInputTask,

    handleStatusChange
  }
   
  
}

export default UseTasks