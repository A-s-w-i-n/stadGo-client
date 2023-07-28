import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../domain/modals/user";
import api from "../../servises/axios";
import jwt_Decode from "jwt-decode";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
  GoogleCredentialResponse,
} from "@react-oauth/google";


interface jwtPaylode {
  sub : string,
  name : string,
  exp :number,
  email:string
}
const userForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userAuth>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    
  });
  const [Gdecode,setDecode] = useState<any> ("")

  const addUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  let googleSignup = async( credentialResponse : GoogleCredentialResponse) => {
   
    const {credential} =credentialResponse as GoogleCredentialResponse
    if(credential){
      try {
        var decode : jwtPaylode = jwt_Decode(credential);
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
console.log(Guser);

        

         const { data } = await api.post("/userRegister", { ...Guser,isGoogle : true });

      if (data.user) {
        navigate("/userHome");
      }
        
      } catch (error) {
        console.error("Token not found")
      }
    }else{
    console.log(credentialResponse);
    }
   
  
    
    // try {
      // const { data } = await api.post("/userRegister", { ...Guser });

  //     if (data.user) {
  //       navigate("/login");
  //     }
  //   } catch (error) {}
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { firstname, lastname, username, password, phone, email } = user;
      if (
        firstname !== " " &&
        lastname !== " " &&
        username !== " " &&
        password !== " " &&
        phone !== " " &&
        email !== " "
      ) {
        console.log("its workinnnnnng");
        console.log(user);

        const { data } = await api.post("/userRegister", { ...user });
        console.log("data :", data);
        if (data.user) {
          navigate("/login");
        }
      }
    } catch (error) {}
  };
  return (
    <div className="fixed">
      <form action="" onSubmit={handleSignup}>
        <div className="relative h-screen flex mt-8">
          <div className="left w-1/2 h-screen bg-white">
            <div className="absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="center shadow-2xl bg-white rounded-xl w-max h-4/5 gap-y-px">
                <div className="text-center pt-3">REGISTER HERE</div>
                <div className="grid grid-cols-2 gap-4 mt-5 ">
                  <input
                    type="text"
                    name="firstname"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-3"
                    placeholder="firstname"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="lastname"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-3"
                    placeholder="lastname"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="username"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="username"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="email"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="email"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="password"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="password"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="phone"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="phone"
                    onChange={addUser}
                  />
                  {/* <input
                type="text"
                name='phone'
                className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                placeholder="phone"
                onChange={addUser}
              />
              <input
                type="text"
                name='postalcode'
                className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                placeholder="postal code"
                onChange={addUser}
              /> */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 ml-48">
                  <div className="flex flex-col items-center justify-center">
                    <button className="rounded-full bg-cyan-300 px-3 py-2 h-100 transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-300 duration-300">
                      REGISTER
                    </button>
                    <h3 className="text-center my-2 h-100">or</h3>
                    <button className="rounded-3xl bg-white border-y border-black px-2  h-11">
                    <GoogleOAuthProvider  clientId="369233122526-6jq1er61ihvpfenp7aosiovivct318d4.apps.googleusercontent.com" >
                        <GoogleLogin
                          onSuccess={googleSignup}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                        />
                      </GoogleOAuthProvider>

                      ;
                    </button>
                    <p>
                      alredy have an accout{" "}
                      <span
                        className="text-cyan-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                      >
                        {" "}
                        LOGIN
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default userForm;
