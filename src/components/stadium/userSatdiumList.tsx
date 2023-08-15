import React, { useState, useEffect } from "react";
import UserNav from "../navbar/userNav";
import { stadim } from "../../domain/modals/stadium";
import api from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSatdiumList = () => {
  const { email }: any = useSelector((state: any) => state.user);
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("stadium/fetchStadiumList")
      .then((stadiumList) => {
        setStadiumData(stadiumList.data.fetchList);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <UserNav />
      <div className="flex   flex-wrap justify-center mt-5 md:ml-10 md:mr-10">
        {stadiumData.map((item) => (
          <div className="relative  w-96 mx-4 my-6 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative  h-40 overflow-hidden rounded-t-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img
                className="w-full"
                src={item.image[0]}
                alt="profile-picture"
              />
            </div>
            <div className="p-6 text-center">
              []{" "}
              <h4 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {item.stadiumname}
              </h4>
              <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-700 antialiased">
                Maximum Capacity: {item.maxcapacity}
              </p>
            </div>
            <div className="flex justify-center gap-7 p-6 pt-2">
              <button
                className="bg-cyan-300 rounded-xl px-5 py-3"
                onClick={() => navigate(`/detailedView/${item._id}`)}
              >
                Check Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSatdiumList;
