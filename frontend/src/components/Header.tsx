import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { useToast } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header: React.FC = () => {
  const { isLoggedIn } = useToast();
 
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold ">
          <Link to="/">SubashVacation.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
             <>
             <Link
               className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
               to="/my-bookings"
             >
               My Bookings
             </Link>
             <Link
               className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
               to="/my-hotels"
             >
               My Hotels
             </Link>
             <SignOutButton/>
             </>
            
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-white text-xl px-4 rounded cursor-pointer bg-blue-400 hover:bg-orange-600"
            >
              Sign In
            </Link>
           
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
