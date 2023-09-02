import React, { useState, useEffect } from "react";
import OwnerNav from "../navbar/ownerNav";
import { stadim } from "../../domain/modals/stadium";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ownerLogged } from "../../Redux/owner/ownerSlice";


const OnwerstadiumList = () => {
  const dispatch = useDispatch();
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();
  const [stadiumname,setEditStadiumName] = useState("")
  const [sportstype,setSportsType] = useState("")
  const [fromdate,setFromdate] = useState("")
  const [todate,setToDate] = useState("")
  const [price,setPrice] = useState("")
  const [image,setImage] = useState([""])
  const [discription,setDiscription] =useState("")

  const [selectedMainImages, setSelectedMainImages] = useState<{
    [stadiumId: string]: string;
  }>(
    {} 
  );
  const handleModalOpen = () => {
    setIsPaymentModalOpen(true);
  };
  const handleModalClose = () =>{
    setIsPaymentModalOpen(false)
  }
  
  // const handleFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStadiumData({ ...stadiumData, [e.target.name]: e.target.value });
  // };
  // const handleFetchStadium = async (e: React.FormEvent) => {
  //   e.preventDefault();
  // const stadiumname = 

  // const editStadiumDetail = (e:React.ChangeEvent<HTMLInputElement>)=>{

  // }


  

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const email = emailCheck.email;




  const fetchStadiumList= () =>{

 
  }
  const fetchData = () => {
    apiAuth
      .post("/stadium/fetchStadium", { email })
      .then((fetchStadium) => {
        console.log(fetchStadium.data.fetchStadiumData);
        setStadiumData(fetchStadium.data.fetchStadiumData);
        setEditStadiumName(fetchStadium.data.fetchStadiumData.stadiumname);
        setSportsType(fetchStadium.data.fetchStadiumData.sportstype);
        setFromdate(fetchStadium.data.fetchStadiumData.fromdate);
        setToDate(fetchStadium.data.fetchStadiumData.todate);
        setPrice(fetchStadium.data.fetchStadiumData.price);
        setDiscription(fetchStadium.data.fetchStadiumData.discription);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  

const updateStadiumList =async () =>{
  
  const data =await apiAuth.post('/stadium/editStadium',{stadiumname,sportstype,fromdate,todate,price,discription,image})
  fetchData()
console.log(data,"data");

  handleModalClose()

}



  if (stadiumData) {
    navigate("/owner/stadiumlist");
  }

  const handleMainImageClick = (stadiumId: string, imageUrl: string) => {
    setSelectedMainImages((prevImages) => ({
      ...prevImages,
      [stadiumId]: imageUrl,
    }));
  };

  return (
    <div>
      <OwnerNav />

      {stadiumData.map((item) => (
        <div className="  h-100 border-spacing-2 border border-black mt-4 relative flex w-11/12 ml-16 max-w-[96rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative border border-black    m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-xl bg-white bg-clip-border text-gray-700">
            <div className="flex flex-row  ">
              {item.image.slice(0, 3).map((imageSrc, i) => (
                <img
                  key={i}
                  className={`object-cover transition duration-300 ease-in-out hover:scale-110 rounded-lg mt-7 w-36 h-32  md:w-0 sm:w-0 md:h-0 lg:w-32 lg:h-32 ml-7 ${
                    selectedMainImages[item.maxcapacity] === imageSrc
                      ? "border border-blue-500"
                      : ""
                  }`}
                  src={imageSrc}
                  alt=""
                  onClick={() =>
                    handleMainImageClick(item.maxcapacity, imageSrc)
                  }
                />
              ))}
            </div>
            <img
              className="object-cover mt-14   w-full h-72 mb-7 xs:w-0 rounded-lg "
              src={
                selectedMainImages[item.maxcapacity] || item.image[2]
              } /* Use selected image or default */
              alt=""
            />
          </div>
          <div className="p-6 ml-16">
            <h4 className="mb-2  block font-sans text-5xl text-center font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {item.stadiumname}
            </h4>
            <div className="flex mb-3 mt-8">
              <p className="font-extrabold w-52  text-xl">Maximum Capacity:</p>
              <p className="font-normal text-gray-800 dark:text-gray-700 ml-6">
                {item.maxcapacity}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold w-40 text-xl ">Availabiltiy:</p>
              <p className="font-normal text-gray-800 dark:text-gray-700 ml-6">
                {item.fromdate} -- <span>{item.todate}</span>
              </p>
            </div>

            <div className="flex mb-3 mt-7">
              <p className="font-extrabold w-40 text-xl">Locatoin:</p>
              <p className="font-normal text-gray-800 dark:text-gray-700 ml-6">
                {item.location}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold w-40 text-xl">Price:</p>
              <p className="font-normal text-gray-800 dark:text-gray-700 ml-6">
              ₹{item.price}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold w-40 text-xl">Discription:</p>
              <p className="font-normal text-gray-800 dark:text-gray-700 ml-6">
                {item.discription}
              </p>
            </div>
            {isPaymentModalOpen && (
              <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
                  <div className="flex text-center justify-center items-center mb-4">
                    <h5 className="text-xl text-center font-semibold text-gray-800 ">
                      EDIT STADIUM DETAILS
                    </h5>
                  </div>
                  {stadiumData.map((item) => (
                    <div>
                      <div className="mt-3">
                        Stadium Name : <input type="text" placeholder={item.stadiumname}  onChange={(e)=>setEditStadiumName(e.target.value)} />
                      </div>
                      <div className="mt-3">
                        Sports Type : <input type="text" placeholder={item.sportstype} onChange={(e)=>setSportsType(e.target.value)}/>
                      </div>
                      <div className="mt-3">
                        From Date : <input type="date" placeholder={item.fromdate} onChange={(e)=>setFromdate(e.target.value)}/>
                      </div>
                      <div className="mt-3">
                        To date : <input type="date" placeholder={item.todate} onChange={(e)=>setToDate(e.target.value)}/>
                      </div>
                      <div className="mt-3">
                        Price : <input type="text" placeholder={item.price} onChange={(e)=>setPrice(e.target.value)}/>
                      </div>
                      <div className="mt-3">
                        Discription : <input type="text"  placeholder={item.discription}  onChange={(e)=>setDiscription(e.target.value)} />
                      </div>
                     
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    {" "}
                    {/* Add this div for center alignment */}
                    <button className="bg-cyan-300 px-3 py-2 rounded-lg" onClick={updateStadiumList}>
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex item-end justify-end">
              <button
                className="flext mt-4 w-24 h-10 border border-black rounded-lg bg-white hover:bg-cyan-300"
                onClick={handleModalOpen}
              >
                Edit Details
              </button>
            </div>
            {/* <a className="inline-block" href="#">
      <button
        className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        >
        Learn More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
          >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            ></path>
        </svg>
      </button>
    </a> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnwerstadiumList;
