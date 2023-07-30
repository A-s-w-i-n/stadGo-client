import {useState} from 'react'
import { ownerAuth } from '../../domain/modals/owner'
import { useNavigate } from 'react-router-dom'
import api from '../../servises/api/axios interceptor '

const OwnerForm :React.FC =()=> {
  const navigate = useNavigate()
  const [owner,setOwner] = useState<ownerAuth>({firstname:"",lastname:"",ownername:"",email:"",companyname:"",phone:"",password:"",location:""})

  const addOwner = ((e:React.ChangeEvent<HTMLInputElement>)=>{
    setOwner({...owner,[e.target.name]:e.target.value})
  })

  const handleOwnerSignUp =async (e:React.FormEvent) =>{
    e.preventDefault()

    try {

      const {firstname,lastname,ownername,email,phone,companyname,location,password} = owner
      console.log(owner);
      console.log("heloooooooooooooo");
      
      
      if(firstname!==" "&&lastname!==" "&&ownername!==" "&&password!==" "&&phone!==" "&&email!==" "&&companyname!==" "&&location!==" "){
        const {data} = await api.post("/owner/ownerRegister",{...owner})
        console.log(data,"4444");
        

        if(data.owner){
          navigate('/login')
        }
      }
    } catch (error) {

      
    }

  }





  return (
    
      <div className='fixed'>
     <form action="" onSubmit={handleOwnerSignUp}>
    <div className="relative h-screen flex mt-8">
      <div className="left w-1/2 h-screen bg-white">
        <div className="absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="center shadow-2xl bg-white rounded-xl w-max h-4/5 gap-y-px">
            <div className="text-center pt-3">
              REGISTER HERE
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5 ">
              <input
                type="text"
                name='firstname'
                className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-3"
                placeholder="firstname"
                onChange={addOwner}
              />
              <input
                type="text"
                className="w-60 rounded-xl border-gray-300 border p-2 mt-3"
                placeholder="lastname"
                name='lastname'
                onChange={addOwner}
              />
              <input
                type="text"
                className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                placeholder="ownername"
                name='ownername'
                onChange={addOwner}
              />
              <input
                type="text"
                className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                placeholder="email"
                name='email'
                onChange={addOwner}
              />
              <input
                type="text"
                className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                placeholder="password"
                name='password'
                onChange={addOwner}
              />
               <input
                type="text"
                className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                placeholder="companyname"
                name='companyname'
                onChange={addOwner}
              />
                <input
                 type="text"
                 className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                 placeholder="location"
                 name='location'
                 onChange={addOwner}
               />
              <input
                type="text"
                className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                placeholder="phone"
                name='phone'
                onChange={addOwner}
              />
             
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 ml-48">
              <div className="flex flex-col items-center justify-center">
                <button className="rounded-full bg-cyan-300 px-3 py-2 h-100 transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-300 duration-300">
                  REGISTER
                </button>
                <h3 className="text-center my-2 h-100">or</h3>
                <button className="rounded-full bg-white border-y border-black px-3 py-2 h-100">
                  <img
                    className="object-contain h-5"
                    src="https://o.remove.bg/downloads/c9d9aaa8-da55-430f-a432-e68618e1af40/download-removebg-preview.png"
                    alt=""
                  />
                </button>
                <p>alredy have an accout <span className='text-cyan-500 cursor-pointer' onClick={()=>navigate('/login')}> LOGIN</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right w-1/2 h-screen bg-cyan-300">
       
       
      </div>
    </div>
  </form>

    </div>
    
  )
}

export default OwnerForm
