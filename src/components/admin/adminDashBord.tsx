import React, { useEffect } from 'react';
import AdminHome from './adminHome';
import {
  Chart,
  initTE,
} from "tw-elements"

const adminDashBord = () => {

  const dataBarHorizontal = {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
      datasets: [
        {
          label: "Traffic",
          data: [30, 15, 62, 65, 61, 65, 40],
        },
      ],
    },
  };
  const optionsBarHorizontal = {
    options: {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
          grid: {
            display: true,
            borderDash: [2],
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
      },
    },
  };
  useEffect(() => {
    const chartElement = document.getElementById("bar-chart-horizontal");
    if (chartElement) {
      new Chart(chartElement, dataBarHorizontal, optionsBarHorizontal);
    }
  }, []);
  return (
    <div>
      <AdminHome/>
      <div className='flex'>
      <div className='  w-[15rem] ml-[24rem]   h-[20rem] relative flex justify-center items-center'>
        <img
          src="https://source.unsplash.com/random/350x350"
          alt="random image"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />
        <div className="absolute p-6 w-[12rem] h-[10rem] rounded-lg bg-white shadow-lg">
          
          
         
         
        </div>
      </div>
      <div className='w-[15rem]   ml-[4rem] h-[20rem] relative flex justify-center items-center'>
        <img
          src="https://source.unsplash.com/random/350x350"
          alt="random image"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />
        <div className="absolute p-6 rounded-lg w-[12rem] h-[10rem] bg-white shadow-lg">
          <div className="flex items-baseline">
            
           
          </div>
         
          
         
        </div>
      </div>
      <div className='w-[15rem]   ml-[4rem] h-[20rem] relative flex justify-center items-center'>
        <img
          src="https://source.unsplash.com/random/350x350"
          alt="random image"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />
        <div className="absolute p-6 rounded-lg w-[12rem] h-[10rem] bg-white shadow-lg">
         
         
          
        </div>
      </div>
      </div>
      <div className="flex">
      <div className="flex flex-col">
        <button className="p-2 ml-[20rem] mt-6 bg-orange-500 rounded-md px-28 py-9">USER</button>
        <button className="p-2  ml-[20rem] mt-10 bg-indigo-500 rounded-md  px-28 py-9">OWNER</button>
      </div>
      <div className="ml-auto w-1/2 h-[16rem] overflow-hidden">
        <canvas id="bar-chart-horizontal"></canvas>
      </div>
    </div>

    </div>
  );
};

export default adminDashBord;
