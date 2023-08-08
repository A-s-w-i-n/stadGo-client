import React from 'react'
import { Navigate } from 'react-router-dom';


interface UserProtectedRouterProps {
  children: React.ReactNode
}

const UserProtectedRouter : React.FC<UserProtectedRouterProps> = ({children}) : any => {
   const user =JSON.parse(  localStorage.getItem('user') as string)
    console.log(user , "jhgksfjdgksjgfkgkjfgh");
    
  return user ? children : <Navigate to={"/login"}/>
      

}

export default UserProtectedRouter
