import React, { useState, useEffect, useCallback } from "react";
import api from "../../servises/api/axios interceptor ";
import AdminHome from "../home/adminHome";
import { userData } from "../../servises/interface/interface";

const AdminFetchUser: React.FC = () => {
  const [userData, setStudetData] = useState<userData[]>([]);

  const handleUserBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const userBlock = await api.post("/admin/blockUser", { id });

      console.log(userBlock);
    } catch (error) {}
  };
  const handleUserUnblock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const UserUnblock = await api.post("/admin/unBlockUser", { id });

      console.log(UserUnblock);
    } catch (error) {}
  };
  useEffect(() => {
    api
      .get("/admin/fetchUser")
      .then((fetchUser) => {
        console.log("fdsfsdfdsf");
        console.log(fetchUser.data, "this is the data");
        setStudetData(fetchUser.data.usersFetch);
      })
      .catch(() => {});
  }, [handleUserUnblock, handleUserBlock]);

  return (
    <div className="flex flex-row w-screen">
      <AdminHome />
      <form action="">
        <div className="p-6">
          <div className="overflow-x-auto w-5/6">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Org Name</th>
                  <th className="px-4 py-2">Rented Stadium</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr>
                    <td className="border px-4 py-2" key={index}>
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{item.username}</td>
                    <td className="border px-4 py-2">a</td>
                    <td className="border px-4 py-2">a</td>
                    <td className="border px-4 py-2">a</td>
                    <td className="border px-4 py-2">
                      {item.isblocked ? (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={(e) => handleUserUnblock(e, item._id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={(e) => handleUserBlock(e, item._id)}
                        >
                          block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
      {/* </AdminHome> */}

      <div></div>
    </div>
  );
};

export default AdminFetchUser;
