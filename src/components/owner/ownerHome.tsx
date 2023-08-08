import React, { useState, useEffect } from "react";
import MainPagenav from "../navbar/mainPagenav";
import { useNavigate } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import { stadim } from "../../domain/modals/stadium";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paypal from "../payment/paypal";
import { ownerData } from "../../domain/modals/ownerData";

const OwnerHome = () => {
  const navigate = useNavigate();
  const [OwnerPrimuim, setOnwerPrimium] = useState(false);

  const [detailsCheck, setDetailsCheck] = useState<ownerData>();
  const userEmail = JSON.parse(localStorage.getItem("owner") as string);
  const email = userEmail.email;
  console.log(email);
  
  const handleFetchDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    if(detailsCheck){
      setOnwerPrimium(false)
      navigate('/owner/stadiumlist')
    }else{
      setOnwerPrimium(true)
    }
   
    try {
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    api
      .post("/owner/fetchOwner", { email })
      .then((fetchData) => {
        setDetailsCheck(fetchData.data.ownerDetail.premium);
        console.log(fetchData.data.ownerDetail.premium);   
      
      })
      .catch(() => {});
  },[]);


  return (
    <div>
      <div>
        <form action="" onSubmit={handleFetchDetail}>
          <div>
            <MainPagenav />
          </div>
          <div className="h-screen flex  justify-center">
            <div className="w-1/2  flex  items-center` justify-center">
              <div className="mt-14 w-full ">
                <img
                  className=" w-11/12"
                  src="/public/mainImages/ownerHome.png"
                  alt=""
                />
              </div>
            </div>
            <div className="w-1/2 h-screen flex ml-10  items-center">
              <div className="">
                <p className="font-serif text-5xl">WELCOME TO STUD GO</p>
                <p className="ml-2 mt-3">EXPLORE THE STADIUM’S </p>
              </div>
              <div className="absolute bottom-0 mb-48">
                <button
                  className="rounded-full fixed bg-cyan-300 hover:bg-cyan-400 px-6 py-3 mb-44  font-serif  text-lg"
                  onClick={handleFetchDetail}
                >
                  Buy Premium{" "}
                </button>

                {OwnerPrimuim ? <Paypal /> : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerHome;
