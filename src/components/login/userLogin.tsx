import React,{useState,useEffect} from 'react'
import api from '../../servises/api/axios interceptor '
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider,GoogleLogin,GoogleCredentialResponse } from '@react-oauth/google'
import jwt_Decode from "jwt-decode";

interface jwtPaylode {
  sub : string,
  name : string,
  exp :number,
  email:string
}

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


  const googleLogin = async( credentialResponse : GoogleCredentialResponse) => {
   
    const {credential} =credentialResponse as GoogleCredentialResponse
    if(credential){
      try {
        const decode : jwtPaylode = jwt_Decode(credential);
        console.log(decode);
        const Guser  = {
          firstname: decode.name,
          lastname :decode.name.split("")[0],
          username: decode.name.split("@")[0],
          email: decode.email,
          phone:decode.exp.toString(),
          password: decode.email.split("@")[0],
          isGoogle:true
        };
         const { data } = await api.post("/userRegister", { ...Guser,isGoogle : true });
      if (data) {
        const Glogincheck = data.name
        const GaccessToken =data.sub   
        localStorage.setItem('user',JSON.stringify(Glogincheck,GaccessToken ))
        navigate("/userHome");
      }else{
       
      }
      } catch (error) {
        console.error("Token not found")
      }
    }else{
    console.log(credentialResponse);
    }
  }
  
  

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
        console.log(data,"mydata");
        if(data.LoginCheck.isblocked == true){
          navigate('/login')
        }else{

          localStorage.setItem('user',JSON.stringify(LoginCheck,accessToken))
  
         navigate('/userHome')
        }
        

       
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
    <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-2/3 shadow-xl rounded-2xl p-4">
    
     <p className='text-center text-2xl'>USER</p>

     <div className=''>
        <input  className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14" type="text" name='email'  placeholder='Email' onChange={handleLoginUser}/>
     </div>
     <div>
        <input  className="w-60 rounded-xl border-gray-300 border m-14 p-2 mt-9" type="text" name='password'   placeholder='password' onChange={handleLoginUser} />
     </div>
     <div className='items-center justify-center'>
     <button  className="rounded-full ml-36 bg-cyan-300 py-3 px-3">submit</button>
     <h3 className="text-center my-2 ">or</h3>
     <div className="flex justify-center items-center ">
  <button className="rounded-3xl bg-white border-y border-black h-2">
    <GoogleOAuthProvider clientId="369233122526-6jq1er61ihvpfenp7aosiovivct318d4.apps.googleusercontent.com">
      <GoogleLogin
        size="medium"
        type="icon"
        onSuccess={googleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  </button>
</div>

  <p className='mt-7 text-center'>alredy have and account <span className='text-blue-400' onClick={()=>navigate('/Register')}>signup</span></p>
     </div>
    </div>
    </form>
  </div>
  
  )
}

export default UserLogin
