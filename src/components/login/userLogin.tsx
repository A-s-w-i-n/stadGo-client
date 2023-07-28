import React,{useState,useEffect} from 'react'
import api from '../../servises/axios'
import { useNavigate } from 'react-router-dom'

const UserLogin :React.FC = () => {
  const navigate =useNavigate()
  const [userLogin,setUserLogin] = useState({
    email : "",
    password : ""
  })
  console.log(userLogin);

  useEffect(()=>{
    let user = localStorage.getItem('user')

    if(user){
      navigate('/userHome')
    }
  },[])
  
  

const handleLoginUser = (e:React.ChangeEvent<HTMLInputElement>) =>{
  {setUserLogin({...userLogin,[e.target.name]:e.target.value})}

}

  const handleLogin = (async(e:React.FormEvent) =>{
    e.preventDefault()

    try {
      const {data} =await  api.post('/login',{...userLogin,})
      if(data){
        const LoginCheck=  data.LoginCheck
        const accessToken = data.accessToken
        console.log(data.accessToken);
        localStorage.setItem('user',JSON.stringify(LoginCheck,accessToken))
       navigate('/userHome')
       
      }
      
    } catch (error) {
      
    }




  })

  return (
    <div className="relative h-screen " >
      <form action="" onClick={handleLogin}>
    <div className="flex justify-center h-full">
      <div className="w-1/2 p-4 bg-whilte-600">
      </div>
    
    </div>
    <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-3/5 shadow-xl rounded-2xl p-4">
    
     <p className='text-center text-2xl'>USER</p>

     <div className=''>
        <input  className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14" type="text" name='email'  placeholder='Email' onChange={handleLoginUser}/>
     </div>
     <div>
        <input  className="w-60 rounded-xl border-gray-300 border m-14 p-2 mt-9" type="text" name='password'   placeholder='password' onChange={handleLoginUser} />
     </div>
     <div>
     <button  className="rounded-full ml-28 bg-cyan-300 py-3 px-3 ...">Save Changes</button>
     </div>
    </div>
    </form>
  </div>
  
  )
}

export default UserLogin
