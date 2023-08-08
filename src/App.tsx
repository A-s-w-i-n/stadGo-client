import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/Register/Register';
import UserOpening from './pages/userPage/userOpen';
import UserHome from './components/user/userHome';
import OwnerHome from './components/owner/ownerHome';
import Login from './components/login/Login';
import AdminLogin from './components/admin/adminLogin';


import './App.css'
import AdminHome from './components/admin/adminHome';
import AdminFetchUser from './components/admin/adminFetchUser';
import AdminFetchOwner from './components/admin/AdminFetchOwner';
import OrgDetail from './components/OrgDetails/orgDetail';
import Stadium from './components/stadium/stadium';
import OnwerstadiumList from './components/stadium/OnwerstadiumList';
import UserProtectedRouter from './pages/ProtectRouter/UserProtectRouter';
import OwnerProtectRouter from './pages/ProtectRouter/ownerProtectRouter';
import UserSatdiumList from './components/stadium/userSatdiumList';
import Paypal from './components/payment/paypal';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        
        <Route path='/' element={<UserOpening/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/userHome' element={<UserProtectedRouter><UserHome/></UserProtectedRouter>}/>
        <Route path='/ownerHome' element={<OwnerProtectRouter><OwnerHome/></OwnerProtectRouter>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/admin/fetchUser' element={<AdminFetchUser/>}/>
        <Route path='/admin/fetchOwner' element ={<AdminFetchOwner/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/orgDetail' element={<UserProtectedRouter><OrgDetail/></UserProtectedRouter>}/>
        <Route path='/stadiumDetails' element={<OwnerProtectRouter><Stadium/></OwnerProtectRouter>}/>
        <Route path='/owner/stadiumlist' element={<OwnerProtectRouter><OnwerstadiumList/></OwnerProtectRouter>}/>
        <Route path='/stadiumList' element={<UserProtectedRouter><UserSatdiumList/></UserProtectedRouter>}/>
        <Route path='owner/premium' element={<OwnerProtectRouter><Paypal/></OwnerProtectRouter>}/>
        


      </Routes>
    </Router>
    </>
  )
}

export default App
