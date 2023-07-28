import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/UserRegister/Register';
import UserOpening from './pages/userOpening/userOpening';
import UserHome from './pages/HOME/userHome';
import OwnerHome from './pages/HOME/ownerHome';
import Login from './components/login/Login';
import AdminLogin from './components/login/adminLogin';


import './App.css'
import AdminHome from './pages/HOME/adminHome';

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
        <Route path='/Login' element={<Login/>}/>
        


      </Routes>
    </Router>
    </>
  )
}

export default App
