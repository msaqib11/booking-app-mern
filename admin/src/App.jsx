import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import Login from "./pages/login/index.jsx"
import './charts/ChartjsConfig';
import Layout from './layout';
// Import pages
import Dashboard from './pages/Dashboard';
import AuthRoute from './components/routes/AuthRoutes.jsx';
import Users from './pages/users/index.jsx';
import AddUser from './pages/users/AddUser.jsx';
import AddHotel from './pages/hotels/AddHotel.jsx';
import Hotels from './pages/hotels/index.jsx';
import Rooms from './pages/rooms/index.jsx';
import AddRoom from './pages/rooms/AddRoom.jsx';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          //protected route
          <AuthRoute>
            <Layout />
          </AuthRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/add-hotel" element={<AddHotel />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
