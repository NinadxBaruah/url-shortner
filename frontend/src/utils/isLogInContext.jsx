import {createContext } from 'react'


const isLogInContext = createContext({
    isLogIn:false,
    setIsLogIn:() =>{}
})

export default isLogInContext;