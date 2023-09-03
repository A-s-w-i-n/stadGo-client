import React, { useState, useEffect } from "react";
import UserNav from "../navbar/userNav";
import { stadim } from "../../domain/modals/stadium";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import  Loader from '../loader/loader'

const UserSatdiumList = () => {
  const { email }: any = useSelector((state: any) => state.user);
  const [location, setLocation] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);
  const [loading,setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredStadiums, setFilteredStadiums] =
    useState<stadim[]>(stadiumData);
  const navigate = useNavigate();

  const fetchStadium = () => {
    api
      .get("/stadium/fetchStadiumList")
      .then((stadiumList) => {
        setStadiumData(stadiumList.data.fetchList);
        setLoading(false)
      })
      .catch(() => {});
  };
  useEffect(() => {
    fetchStadium();
  }, []);

  useEffect(() => {
    const filtered = stadiumData.filter((item) =>
      item.stadiumname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStadiums(filtered);
  }, [searchTerm, stadiumData]);

  const handleLocationFilter =async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.selectedOptions;

    setLocation(filter[0].value);
    if(filter[0].value == "option1"){
      fetchStadium();

    }else{

      const stadiumlocationFilter = await api.post('/stadium/stadiumLocationFilter',{location})
      setFilteredStadiums(stadiumlocationFilter.data.filter)
      console.log(stadiumlocationFilter.data.filter);
    }


    
  };
  console.log(location);

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.selectedOptions;
    console.log(filter);

    if (filter[0].value == "option1") {
      console.log(filter[0].value);

      fetchStadium();
    } else {
      setSelectedFilter(filter[0].value);
      const [minValue, maxValue] = filter[0].value.split(" - ");

      const firstValue = minValue;
      const secondValue = maxValue;

      //  console.log("firstValue", firstValue);
      //  console.log("secondValue", secondValue);

      const filterdata = await api.post("/stadium/stadFilter", {
        firstValue,
        secondValue,
      });
      setFilteredStadiums(filterdata.data.filter);
      console.log(filterdata.data.filter);
    }
  };
  console.log(stadiumData);

  // console.log(filter[0].value);

  return (
    <div>
      {<Loader/>&&loading}
      <UserNav />
      <form>
        <div className="relative w-[18rem]  ml-auto">
        <div className="flex items-center">
  <select
    className="mr-4 px-2 py-1 border rounded-md"
    onChange={handleFilter}
  >
    <option value="option1">Capacity</option>
    <option value="10000 - 30000">10000 - 30000</option>
    <option value="30000 - 50000">30000 - 50000</option>
    <option value="50000 - 70000">50000 - 70000</option>
    <option value="70000 - 100000">70000 - 100000</option>
  </select>
  <select
    className="px-2 py-1 border rounded-md"
    onChange={handleLocationFilter}
  >
    <option value="option1">ALL</option>
    {stadiumData.map((item) => (
      <option value={item.location}>{item.location}</option>
    ))}
  </select>
</div>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 mt-8 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm  text-black shadow-2xl rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Stadiums"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="flex   flex-wrap justify-center mt-5 md:ml-10 md:mr-10">
        {filteredStadiums.length > 0 ? (
          filteredStadiums.map((item) => (
            <div className="relative  w-96 mx-4 my-6 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="relative  h-40 overflow-hidden rounded-t-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <img
                  className="w-full"
                  src={item.image[0]}
                  alt="profile-picture"
                />
              </div>
              <div className="p-6 text-center">
                {" "}
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
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">
            <img src="/public/mainImages/noResultFound.png" alt="" />
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSatdiumList;
