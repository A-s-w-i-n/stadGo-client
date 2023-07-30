import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import api from "../../servises/api/axios interceptor ";
import AdminFetchUser from "../adminMangement/adminFetchUser";
import AdminFetchOwner from "../adminMangement/AdminFetchOwner";
import { Navigate, useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const mainContentStyle = {
    marginLeft: isSidebarOpen ? "64px" : "0",
    width: isSidebarOpen ? `calc(100% - 64px)` : "100vw",
    transition: "width 0.3s ease",
  };

  return (
    <>
      <div className="bg-white- h-screen w-64">
        <div className="flex h-screen w-full">
          <aside
            className={`bg-gray-500 w-full p-4 ${
              isSidebarOpen
                ? "transform translate-x-0"
                : "transform -translate-x-full "
            } transition-transform duration-300`}
          >
            {/* Sidebar content here */}
            {isSidebarOpen && (
              <>
                <button
                  onClick={toggleSidebar}
                  className="absolute mt-1 ml-32 text-blue- focus:outline-none w-full"
                >
                  <AiOutlineClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">Admin</h2>
                <div className="mt-14 text-2xl font-bold font-serif ">
                  DashBoard
                </div>
                <div className="mt-10 text-2xl font-bold font-serif ">
                  Premium
                </div>
                <div className="mt-14 text-2xl font-bold font-serif ">
                  Stadium
                </div>
                <div
                  className="mt-14 text-2xl font-bold font-serif "
                  onClick={() => navigate("/admin/fetchOwner")}
                >
                  Owners
                </div>
                <div
                  className="mt-14 text-2xl font-bold font-serif "
                  onClick={() => navigate("/admin/fetchUser")}
                >
                  Users
                </div>
                <div
                  className="mt-14 text-2xl font-bold font-serif "
                  onClick={handleAdminLogout}
                >
                  Logout
                </div>
              </>
            )}
          </aside>

          <main className="flex-1 p-2" style={mainContentStyle}>
            {!isSidebarOpen && (
              <div className="absolute left-2 text-xl font-bold">
                <button
                  onClick={toggleSidebar}
                  className="text-blue- focus:outline-none mt-3"
                >
                  <AiOutlineMenu size={24} />
                </button>
                <span className="ml-5">Admin</span>
              </div>
            )}

            {/* <div>
              {userMange&&<AdminFetchUser/>}
              {ownerManage&&<AdminFetchOwner/>}
            </div> */}

            {}
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
