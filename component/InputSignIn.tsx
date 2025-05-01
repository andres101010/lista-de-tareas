import { userLogin as userSignIn } from "@/interface/interface"
import UseSignIn from "@/hooks/UseSignIn"
import {signin} from "@/services/signIn"


const InputSignIn = ({handleShowSignIn}: { handleShowSignIn: () => void }) => {

    const {
        valuesSignIn,
        setValuesSignIn,
        handelValueSignIn
      } = UseSignIn()

    

      const signIn = async (values:userSignIn) => {
        try {
          const res = await signin(values)
          console.log("res", res) 
          setValuesSignIn({name:"", lastName:"", email:"", password:""})
        } catch (error) {
          console.log("err", error)
          setValuesSignIn({name:"", lastName:"", email:"", password:""})
          throw error
        }
      }

  return (
    <div className='flex flex-col items-center justify-center bg-amber-500 h-[350px] w-[300px] p-4 rounded-md'>
       <h1 className="text-amber-950">Registrate</h1>
      <input className='mb-4 p-3 w-full h-12 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='name' placeholder="Name" onChange={handelValueSignIn} value={valuesSignIn.name}/>
      <input className='mb-4 p-3 w-full h-12 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='lastName' placeholder="Last Name" onChange={handelValueSignIn} value={valuesSignIn.lastName}/>
      <input className='mb-4 p-3 w-full h-12 text-lg rounded bg-amber-200 text-amber-950'  type="text" name='email' placeholder="Email" onChange={handelValueSignIn} value={valuesSignIn.email}/>
      <input className='p-3 w-full h-12 text-lg rounded bg-amber-200  text-amber-950' type="password" name='password' placeholder="Password" onChange={handelValueSignIn} value={valuesSignIn.password}/>
      <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5' onClick={()=>signIn(valuesSignIn)}>Guardar</button>
      <button className='bg-amber-50 text-2xl text-amber-600 rounded-t-md mt-1.5' onClick={()=>handleShowSignIn()}>Atras</button>
    </div>
  )
}

export default InputSignIn