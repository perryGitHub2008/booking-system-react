import Home from './Component/Home.js';
import FlightAndHotel from './Component/FlightAndHotel.js';
import HotelAndHome from './Component/HotelAndHome.js';
import Flight from './Component/Flight.js';
import MenuBar from './Component/MenuBar';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginComponent/Login.js';
import Register from './RegisterComponent/Register.js';
import PropertyList from './SearchComponent/PropertyList.js';
import PropertyDetailView from './PropertyDetailComponent/PropertyDetailView.js';
import BookingView from './BookingComponent/BookingView.js';
import ProfileContainer from './ProfileComponent/ProfileContainer.js';
import RequireLogin from './LoginComponent/RequireLogin.js';
import Logout from './LoginComponent/Logout.js';
import PersistLogin from './LoginComponent/PersistLogin.js';
import MyBookingView from './MyBookingComponent/MyBookingView.js';

function App() {
  return (
    <div style={{ background:'white'}}>
      
      <Routes>
        <Route path="login" element={<><MenuBar /><Login /></>} />
        <Route element={<PersistLogin/>}>
          <Route path="" element={<><MenuBar /><Home /></>} />
          <Route path="fight-and-hotel" element={<FlightAndHotel />} />
          <Route path="hotels-and-homes" element={<HotelAndHome />} />
          <Route path="fight" element={<Flight />} />
          <Route path="todaysdeals" element={<Home />} />
          <Route path="apartments" element={<><MenuBar /><Home /></>} />
          <Route path="search" element={<><MenuBar /><PropertyList /></>} />
          <Route path="register" element={<><MenuBar /><Register /></>} />
          <Route path="property-details" element={<><MenuBar /><PropertyDetailView /></>} />
          <Route path="book" element={<><BookingView /></>} />
          <Route path="mybooking" element={<><MenuBar /><MyBookingView /></>} />
          <Route path='logout' element={<Logout/>}/>
          <Route element={<><MenuBar /><RequireLogin/></>}>
            <Route path='profile' element={<><ProfileContainer/></>} />
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
