import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../servises/axios'





const OwnerLogin :React.FC = () => {
    const navigate = useNavigate()
    const [ownerLogin,setOwnerLogin] = useState({
        email : "",
        password : ""
    })
    

    const handleLoginOwner = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setOwnerLogin({...ownerLogin,[e.target.name]:e.target.value})
    }

    const handleOwnerLogin = (async(e:React.FormEvent)=>{
        e.preventDefault()

        try {
            const {data} = await api.post('/owner/ownerLogin',{...ownerLogin})

            if(data){
                navigate('/ownerHome')
            }
        } catch (error) {
            
        }
    })

    
  return (
    <div className="relative h-screen">
    <form action="" onSubmit={handleOwnerLogin} >
  <div className="flex justify-center h-full">
    <div className="w-1/2 p-4 bg-whilte-600">
    </div>
  
  </div>
  <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-3/5 shadow-xl rounded-2xl p-4">
  
   <p className='text-center text-2xl'>OWNER </p>

   <div className=''>
      <input  className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14" type="text" name='email'  placeholder='Email' onChange={handleLoginOwner}/>
   </div>
   <div>
      <input  className="w-60 rounded-xl border-gray-300 border m-14 p-2 mt-9" type="text" name='password'   placeholder='password' onChange={handleLoginOwner} />
   </div>
   <div>
   <button className="rounded-full ml-28 bg-cyan-300 py-3 px-3 ...">Save Changes</button>
   </div>
  </div>
  </form>
</div>
  )
}

export default OwnerLogin
