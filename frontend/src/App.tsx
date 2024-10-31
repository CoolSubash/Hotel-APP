
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

import AddHotel from "./pages/AddHotel";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import BookingFormPage from "./pages/Booking";
import BookedHotel from "./pages/MyBooking";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Layout> <Home></Home></Layout>}></Route>
       <Route path="/register" element={<Layout><Register></Register></Layout>}></Route>
       <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}></Route>
       <Route path="/add-hotel" element={<Layout><AddHotel></AddHotel></Layout>}></Route>
       <Route path="/search" element={<Layout><Search></Search></Layout>}></Route>

       <Route path="/my-hotel" element={<Layout><MyHotel/></Layout>}></Route>
       <Route path="/my-hotel/:id" element={<Layout><EditHotel/></Layout>}></Route>
       <Route path="/hotel/:id" element={<Layout><HotelDetails/></Layout>}></Route>
       <Route path="/hotel/:id/booking" element={<Layout><BookingFormPage/></Layout>}></Route>
       <Route path="/my-booking" element={<Layout><BookedHotel></BookedHotel></Layout>}></Route>
       </Routes>
    </BrowserRouter>

    
  );
}

export default App;
