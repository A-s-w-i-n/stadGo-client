import  { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Icons } from "react-toastify";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
// import  { apiAuth } from "../../servises/api/axios interceptor ";
import { useSelector } from "react-redux";

const OwnerNav = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  // const owner =localStorage.removeItem('owner')

  // if(owner){
  //   navigate('/login')

  // }
  const handleLogout = () => {
    localStorage.removeItem("owner");

    navigate("/login");
  };
  // const { userId }: any = useSelector((state: any) => state.user);
  const { ownerId }: any = useSelector((state: any) => state.owner);
  console.log(ownerId);

  // const createChat = () => {
  //   apiAuth.post("/chat/accessChat", { ownerId, userId }).then((result) => {
  //     if (result) {
  //       navigate("/owner/Chat");
  //       // setFirstChat(false)
  //     }
  //   });
  // };
  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      {/* Main Navigation */}
      <div className="fixed bg-white z-[999] shadow-lg w-full h-16 flex items-center">
        <img
          className="w-28 ml-5"
          src="/public/mainImages/STADGO-logos_black.png"
          alt=""
        />

        <div className="ml-auto mr-5">
          {/* 
          <AiOutlinePlus/> */}

          {/* Toggle button */}
          <button onClick={toggleSidebar}>
            {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed bg-cyan-200 z-[999] h-screen w-64 right-0 top-16 transition-transform transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Icon to close the sidebar */}
        {showSidebar && (
          <div className="absolute top-0 left-0 mt-3 ml-3">
            <button onClick={closeSidebar}>
              {/* Replace this with your desired icon for closing */}
            </button>
          </div>
        )}

        {/* Add your list items here */}
        <table className="p-4 mt-5 ml-8">
          <tr>
            <td
              className="font-bold text-2xl mt-6 pt-4 cursor-pointer "
              onClick={() => navigate("/owner/ownerProfile")}
            >
              Profile
            </td>
          </tr>
          {/* <tr>
            <td
              className="font-bold cursor-pointer text-2xl mt-6 pt-4"
              onClick={createChat}
            >
              Chat
            </td>
          </tr> */}
          <tr>
            <td className="font-bold text-2xl mt-6 pt-4">Notification</td>
          </tr>
          <tr>
            <td
              className="font-bold text-2xl mt-6 pt-4"
              onClick={() => navigate("/owner/Chat")}
            >
              Chat
            </td>
          </tr>
          {/* <tr>
    <td className="font-bold text-2xl mt-6 pt-4 cursor-pointer " onClick={()=>navigate('/stadiumDetails')}>add stadium</td>
  </tr> */}
          <tr>
            <td
              className="font-bold text-2xl mt-6 pt-4 cursor-pointer"
              onClick={() => navigate("/owner/videoUplode")}
            >
              Uplode Video
            </td>
          </tr>
          <tr>
            <td
              className="font-bold text-2xl mt-6 pt-4 cursor-pointer"
              onClick={() => navigate("/owner/ownerDashBoard")}
            >
              Dash Board
            </td>
          </tr>
          <tr>
            {/* <td className="font-bold text-2xl mt-6 pt-4 cursor-pointer" >Add Stadium</td> */}
          </tr>

          <tr>
            <td
              className="font-bold text-2xl pt-4 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </td>
          </tr>
          {/* Add more items as needed */}
        </table>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 pr-4 pb-4 pl-4">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default OwnerNav;
