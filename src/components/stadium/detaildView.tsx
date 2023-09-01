import React, { useEffect, useState, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import UserNav from "../navbar/userNav";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import { stadim } from "../../domain/modals/stadium";
import { userData } from "../../domain/modals/userData";
import { toast } from "react-toastify";
const DetaildView: React.FC = () => {
  const [usersPremium, setUserPremium] = useState(false);
  const [checkDetail, setCheckDetail] = useState<userData>();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
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
  const emaiId = JSON.parse(localStorage.getItem("user") as string);
  const email = emaiId.LoginCheck.email;
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

        if (checkDetail) {
      // setUserPremium(false);
      // navigate("/Chat");
    } else {
      // openPaymentModal();
      // setUserPremium(true);
    }



  useEffect(() => {
    api.post("/fetchUsers", { email }).then((fetchdata) => {
      setCheckDetail(fetchdata.data.userDetail.premium);
    });
  }, []);

  return (
    <div className="">
    <UserNav />
    <div className="flex w-full space-x-4 mt-8">
      <div className="flex-1">
     
        {image && image.length>0 && (
          <Slider {...settings}>
              {image && (
                <Slider {...settings}>
                  <div>
                    <img
                      src={image[0]}
                      alt=""
                      className="w-full h-[26rem] rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={image[1]}
                      alt=""
                      className="w-full h-[26rem]  rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={image[2]}
                      className="w-full h-[26rem]  rounded-md"
                    />
                  </div>
                </Slider>
              )}
            {/* Other slider items */}
          </Slider>
        )}
      </div>
      <div className="flex-1">
        <video className="w-full h-[26rem] rounded-md" controls autoPlay src={carosal?.video} />
      </div>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg mt-8 text-center">
      <div className="text-2xl font-bold mb-2 mt-2">{carosal?.stadiumname?.toUpperCase()}</div>
      <div className="text-lg mt-2">{carosal?.location}</div>
      <div className="text-lg mt-2">{carosal?.maxcapacity}</div>
      <div className="text-lg mt-2">{carosal?.sportstype}</div>
      <div>
        {carosal?.fromdate} / <span>{carosal?.todate}</span>
      </div>
      <div className="text-lg mt-2">{carosal?.discription}</div>
      {/* Other info */}
      <button
        className={`mt-4 py-2 px-4 rounded-lg ${
          checkDetail ? "bg-blue-500 text-white" : "bg-green-500 text-white"
        }`}
        onClick={createChat}
      >
        {checkDetail ? "START CHAT" : "Buy Premium"}
      </button>
    </div>
  </div>
  );
};

export default DetaildView;
