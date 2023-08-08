import React,{useState} from 'react'
import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai"

const UserNav = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
      setShowSidebar((prevShowSidebar) => !prevShowSidebar);
    };

    const closeSidebar = () => {
      setShowSidebar(false);
    };
  return (
    <div>
    {/* Main Navigation */}
    <div className='fixed bg-white shadow-lg w-full h-16 flex items-center'>
      <img className='w-28 ml-5' src="/public/mainImages/STADGO-logos_black.png" alt="" />
      <div className='ml-auto mr-5'>
        {/* Toggle button */}
        <button  onClick={toggleSidebar}>
          {showSidebar ? <AiOutlineClose/> : <AiOutlineMenu/>}
        </button>
      </div>
    </div>

    {/* Sidebar */}
    <div
      className={`fixed bg-cyan-200 h-screen w-64 right-0 top-16 transition-transform transform ${
        showSidebar ? 'translate-x-0' : 'translate-x-full'
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
    <td className="font-bold text-2xl mt-6 pt-4 ">Profile</td>
  </tr>
  <tr>
    <td className="font-bold text-2xl mt-6 pt-4">Chat</td>
  </tr>
  <tr>
    <td className="font-bold text-2xl mt-6 pt-4">Notification</td>
  </tr>
  <tr>
    <td className="font-bold text-2xl pt-4">Logout</td>
  </tr>
  {/* Add more items as needed */}

</table>

    </div>

    {/* Main Content */}
    <div className='ml-64 pt-16 pr-4 pb-4 pl-4'>
      {/* Your main content goes here */}
     
    </div>
  </div>
  )
}

export default UserNav
