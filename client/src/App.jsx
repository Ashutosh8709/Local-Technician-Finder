import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import RefreshHandler from './components/RefreshHandler';
import Booking from './pages/Booking';

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRouter=({element})=>{
    return isAuthenticated ? element:<Navigate to="/login"/>
  }


  return (
    <>
      <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
          <Routes>
            <Route path='/' element={<PrivateRouter element={<Home/>}/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/booking' element={<Booking/>}/>
          </Routes >
       </BrowserRouter>
    </>
  )
}

export default App
