"use client";
import {useState} from 'react'

const UseLogin = () => {
    const [values, setValues] = useState({email:"", password:""})
    const [showSignIn, setShowSignIn] = useState(true)

    const handleShowSignIn = () => {
      setShowSignIn(!showSignIn)
    }

    const handelValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }

  return {
    values,
    setValues,
    handelValue,

    handleShowSignIn,
    showSignIn,
    setShowSignIn

  }
  
}

export default UseLogin