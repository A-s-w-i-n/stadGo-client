import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/UserRegister/Register';
import UserOpening from './pages/openPage/userOpening';
import UserHome from './pages/home/userHome';
import OwnerHome from './pages/home/ownerHome';
import Login from './components/login/Login';
import AdminLogin from './components/login/adminLogin';


import './App.css'
import AdminHome from './pages/home/adminHome';
import AdminFetchUser from './pages/adminMangement/adminFetchUser';
import AdminFetchOwner from './pages/adminMangement/AdminFetchOwner';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<UserOpening/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/userHome' element={<UserHome/>}/>
        <Route path='/ownerHome' element={<OwnerHome/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/admin/fetchUser' element={<AdminFetchUser/>}/>
        <Route path='/admin/fetchOwner' element ={<AdminFetchOwner/>}/>
        <Route path='/Login' element={<Login/>}/>
        


      </Routes>
    </Router>
    </>
  )
}

export default App
