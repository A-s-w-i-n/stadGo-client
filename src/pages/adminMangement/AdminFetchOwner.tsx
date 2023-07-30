import React,{useState,useEffect} from 'react'
import api from '../../servises/api/axios interceptor '
import AdminHome from '../home/adminHome'
import { ownerData } from '../../servises/interface/interface'


const AdminFetchOwner :React.FC = () => {

  const [ownerData,setOnwerData] = useState<ownerData[]>([])

  const handleOwnerBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const ownerBlock = await api.post("/admin/blockOwner", { id });

      console.log(ownerBlock);
    } catch (error) {}
  }; 
  const handleOwnerUnblock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const OwnerUnblock = await api.post("/admin/unBlockOwner", { id });

      console.log(OwnerUnblock);
    } catch (error) {}
  };


useEffect(()=>{
  api.get("/admin/fetchOwner")
  .then((fetchOwner)=>{
    console.log(fetchOwner.data.ownerFetch);
    
    setOnwerData(fetchOwner.data.ownerFetch )
  }).
  catch(()=>{})
},[handleOwnerBlock,handleOwnerUnblock])
  
  return (
    <div className='flex flex-row w-screen '>
      <AdminHome/>
    <div className="p-6">
           <div className="overflow-x-auto">
             <table className="table-auto w-full border-collapse">
               <thead>
                 <tr>
                   <th className="px-4 py-2">No</th>
                   <th className="px-4 py-2">Owner</th>
           
                   <th className="px-4 py-2"> Stadium name</th>
                   <th className="px-4 py-2">Price</th>
                   <th className="px-4 py-2">Action</th>
                 </tr>
               </thead>
               <tbody>
                {ownerData.map((item,index)=>(

             
                 <tr>
                 
                   <td className="border px-4 py-2">{index+1}</td>
                   
                   <td className="border px-4 py-2">{item.ownername}</td>
                   <td className="border px-4 py-2">Name</td>
                   <td className="border px-4 py-2">10</td>
                   <td className="border px-4 py-2">
                    {item.isblocked ? (
                     <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={(e)=>handleOwnerUnblock(e,item._id)}>
                       uncblock
                     </button>
                    ):(
                     <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={(e)=>handleOwnerBlock(e,item._id)}>
                       block
                     </button>
                    ) } 
                   </td>
                 </tr>
                    ))
}
               </tbody>
             </table>
           </div>
         </div>
 </div>
  )
}

export default AdminFetchOwner
