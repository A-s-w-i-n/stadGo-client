import React, { useEffect, useState, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import UserNav from "../navbar/userNav";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import { stadim } from "../../domain/modals/stadium";
const DetaildView: React.FC = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [carosal, setCarosal] = useState<stadim>();
  const [firstChat, setFirstChat] = useState(true);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user") as string);
  const userId = user.LoginCheck._id;

  useEffect(() => {
    console.log(id);

    if (id) {
      api.post("/stadium/detaildView", { id }).then((result) => {
        setCarosal(result.data.fetchDetails);
      });
    }
  }, []);
  const ownerId = carosal?.id;
  const image = carosal?.image;

  const createChat = () => {
    api.post("/chat/accessChat", { ownerId, userId }).then((result) => {
      if (result) {
        navigate("/Chat");
        setFirstChat(false);
      }
    });
  };

  return (
    <div className="">
      <UserNav />
      <div className="flex">
        <div className="flex w-1/2 items-center justify-center  bg-white h-screen">
          <div className="bg-white w-[35rem] h-[33rem]">
            <div className=" justify-center items-center">
              {image && (
                <Slider {...settings}>
                  <div>
                    <img
                      src={image[0]}
                      alt=""
                      className="w-full h-96 mt-12 rounded-lg"
                    />
                  </div>
                  <div>
                    <img
                      src={image[1]}
                      alt=""
                      className="w-full h-96 mt-12 rounded-lg"
                    />
                  </div>
                  <div>
                    <img
                      src={image[2]}
                      className="w-full h-96 mt-12 rounded-lg"
                    />
                  </div>
                </Slider>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-1/2 bg justify-around   h-screen">
          <div className=" w-[35rem] h-[33rem]">
            <video
              className="grid rounded-2xl rounded-t-2xl w-full h-[29rem] mt-9"
              controls
              width="400"
              autoPlay
              src={carosal?.video}
            />
          </div>
        </div>
      </div>
      <div className=" w-full bg-white h-100">
        <div className="text-center font-bold text-4xl font-serif">
          <p>{carosal?.stadiumname?.toLocaleUpperCase()}</p>
        </div>
        <div className="text-center font-mono">
          <p>{carosal?.location}</p>
        </div>
        <div className="text-center font-serif text-2xl font-semibold mt-8">
          <p>{carosal?.maxcapacity}</p>
        </div>
        <div className="text-center  font-semibold">
          <p>
            {carosal?.fromdate}/ <span>{carosal?.todate}</span>
          </p>
        </div>
        <div className="text-center font-mono text-2xl font-semibold">
          <p>{carosal?.sportstype}</p>
        </div>
        <div className="text-center font-serif text-2xl font-semibold">
          <p>{carosal?.price}</p>
        </div>
        <div className="text-center  font-serif">
          <p>{carosal?.discription}</p>
        </div>

        <div className="text-center mt-4  font-serif">
          <button
            className="bg-cyan-300 py-3 rounded-3xl  px-3"
            onClick={createChat}
          >
            START CHAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetaildView;
