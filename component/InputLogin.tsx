"use client";

import img from '@/public/tareas.png'
import Image from 'next/image'
import UseLogin from '@/hooks/UseLogin'
import {login} from '@/services/login'
import { userLogin } from '@/interface/interface';
import InputSignIn from './InputSignIn';
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext';

const InputLogin = () => {
  const router = useRouter();
  const {setUser} = useUser()
  const {
    values,
    setValues,
    handelValue,

    handleShowSignIn,
    showSignIn,

  } = UseLogin()


  const sendData = async (values:userLogin) => {
    try {
      const resp = await login(values)
      console.log(resp)
      setValues({email:"", password:""})
      if(resp.status == 200){
        router.push(`/home/${resp.data.user.iduser}`);
        setUser(resp.data.user)
      }
    } catch (error) {
      console.log("err", error)
      setValues({email:"", password:""})
      throw error
    }
  }

 
  return (
    <>
     {
      showSignIn ?
      <div className='flex flex-col items-center justify-center bg-amber-500 h-[350px] w-[300px] p-4 rounded-md'>
      <Image 
         src={img}    // Ruta desde la carpeta public
         alt="tarea"
         width={90}              // Ancho deseado
         height={90}             // Alto deseado
         className="rounded-lg mb-2"   // Tailwind para bordes redondeados u otros estilos
       />
     <input className='mb-4 p-3 w-full h-12 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='email' placeholder="Email" onChange={handelValue} value={values.email}/>
     <input className='p-3 w-full h-12 text-lg rounded bg-amber-200  text-amber-950' type="password" name='password' placeholder="Password" onChange={handelValue} value={values.password}/>
     <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5 p-1' onClick={()=>sendData(values)}>Iniciar Sesion</button>
     <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5 p-1' onClick={()=>handleShowSignIn()}>Registrarse</button>
      </div>
      :
      <InputSignIn handleShowSignIn={handleShowSignIn}/>
     }
    </>
  

  )
}

export default InputLogin