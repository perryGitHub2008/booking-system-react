import Home from './Component/Home.js';
import FlightAndHotel from './Component/FlightAndHotel.js';
import HotelAndHome from './Component/HotelAndHome.js';
import Flight from './Component/Flight.js';
import MenuBar from './Component/MenuBar';
import SearchView from './SearchComponent/SearchView';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginComponent/Login.js';
import Register from './RegisterComponent/Register.js';
import { useState } from 'react';

function App(props) {

  return (
    <div style={{ background:'white'}}>

      <MenuBar/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="fight-and-hotel" element={<FlightAndHotel />} />
        <Route path="hotels-and-homes" element={<HotelAndHome />} />
        <Route path="fight" element={<Flight />} />
        <Route path="todaysdeals" element={<Home />} />
        <Route path="apartments" element={<Home />} />
        <Route path="search" element={<SearchView />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register/>} />
      </Routes>

    </div>
  );
}

export default App;
