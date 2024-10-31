import { FaUserFriends, FaCity, FaChild } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../API-CLIENT";
import { useToast } from "../contexts/AppContext";
import Spinner from "../components/Spinner";

const MyHotel = () => {
  const { showToast } = useToast();

  const {
    data: hotels,
    isLoading,
    isError,
  } = useQuery("myhotel", apiClient.fetchMyHotel, {
    onSuccess: () => {},
    onError: () => {
      showToast({ message: "Error While Fetching Data", type: "ERROR" });
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          Something went wrong while fetching hotel data.
        </div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center my-3">No hotels available.</div>
        <Link to="/add-hotel">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Add Hotel
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-5 md:px-8 my-6">
      <div className="flex items-center justify-between p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">My Hotels</h1>
        <Link to="/add-hotel">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Add Hotel
          </button>
        </Link>
      </div>

      {/* Map over the hotels array */}
      {hotels?.map((hotel: any) => (
        <div
          key={hotel._id}
          className="w-full bg-white rounded-xl shadow-lg overflow-hidden my-8 transition transform hover:scale-105 duration-300"
        >
          
          <div className="p-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {hotel.name}
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* Hotel City and Country */}
              <div className="flex items-center text-gray-700">
                <FaCity className="mr-2" />
                <span>
                  {hotel.city}, {hotel.country}
                </span>
              </div>

              {/* Adult and Child Count */}
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <FaUserFriends className="mr-2" />
                  <span>{hotel.adultCount} Adults</span>
                </div>
                <div className="flex items-center">
                  <FaChild className="mr-2" />
                  <span>{hotel.childCount} Children</span>
                </div>
              </div>

              {/* View Details Button */}
              <div>
                <Link to={`/my-hotel/${hotel._id}`}>
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHotel;
