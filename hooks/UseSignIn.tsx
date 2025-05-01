import { useState } from "react"


const UseSignIn = () => {
    const [valuesSignIn, setValuesSignIn] = useState({name:"", lastName:"", email:"", password:""})

    const handelValueSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValuesSignIn(prev => ({ ...prev, [name]: value }));
    }

  return {
    valuesSignIn,
    setValuesSignIn,
    handelValueSignIn
  }
   
  
}

export default UseSignIn