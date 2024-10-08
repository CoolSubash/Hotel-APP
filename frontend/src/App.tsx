
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

import AddHotel from "./pages/AddHotel";


function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Layout> <p>Home page</p></Layout>}></Route>
       <Route path="/register" element={<Layout><Register></Register></Layout>}></Route>
       <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}></Route>
       <Route path="/add-hotel" element={<Layout><AddHotel></AddHotel></Layout>}></Route>
       </Routes>
    </BrowserRouter>

    
  );
}

export default App;
