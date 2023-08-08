import React, { useState, useEffect } from "react";
import OwnerNav from "../owner/ownerNav";
import { stadim } from "../../domain/modals/stadium";
import api from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";

const OnwerstadiumList = () => {
  const navigate = useNavigate();
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);

  // const handleFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStadiumData({ ...stadiumData, [e.target.name]: e.target.value });
  // };
  // const handleFetchStadium = async (e: React.FormEvent) => {
  //   e.preventDefault();

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const email : any = emailId.email;


    useEffect(() => {
      api
        .post("/stadium/fetchStadium", {email})
        .then((fetchStadium) => {
          setStadiumData(fetchStadium.data.fetchStadiumData);
        })
        .catch(() => {});
    }, []);
 
  if (stadiumData) {
    navigate("/owner/stadiumlist");
  }

  return (
    <div>
      <OwnerNav />
      <div>
        {stadiumData.map((item) => (
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row w-11/12  h-100 sm:w-3/4 lg:w-11/12  hover:bg-gray-100 dark:border-gray-700 dark:bg-white ml-16">
            <div className="w-1/2">
            <div className="flex flex-row">
              {item.image.slice(0, 3).map((imageSrc, i) => (
                <img
                  key={i}
                  className="object-cover  transition duration-300 ease-in-out hover:scale-110  rounded-lg mt-2 w-36 h-32 md:w-24 md:h-24 lg:w-32 lg:h-32 ml-14  "
                  src={imageSrc}
                  alt=""
                />
              ))}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex-grow">
                {/* Empty container for small images */}
              </div>
              <img
                className="object-cover  w-100 h-72  mb-7 ml-16 rounded-xl mt-7  "
                src={item.image[2]}
                alt=""
                />
            </div>
                </div>
            <div className="flex flex-col p-4 leading-normal text-center  ">

              <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-black">
                {item.stadiumname}
              </h5>
              <div className="flex flex-col mt-10">
  <div className="flex mb-3">
    <p className="font-extrabold w-40">Maximum Capacity:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.maxcapacity}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">Location:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.location}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">Price:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6 ">{item.price}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">From Date:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.fromdate}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">To Date:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.todate}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">Sports Type:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.sportstype}</p>
  </div>
  <div className="flex mb-3 mt-3">
    <p className="font-extrabold w-40">Description:</p>
    <p className="font-normal text-gray-700 dark:text-gray-400 ml-6">{item.discription}</p>
  </div>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnwerstadiumList;
