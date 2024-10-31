import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../API-CLIENT";

const MyBooking = () => {
  const navigate = useNavigate();

  // Fetch bookings
  const { data: bookings = [] } = useQuery("bookings", apiClient.fetchBookings, {
    refetchOnWindowFocus: false,
  });

  // Fetch hotels only if bookings are available
  const hotelIds = bookings.map((booking:any) => booking.hotelId); // Safely map ids
  const { data: hotelsData = [] } = useQuery(
    ["hotels", hotelIds],
    async () => {
      const hotelPromises = bookings.map((booking:any) =>
        apiClient.fetchHotelSingle(booking.hotelId).catch(() => null)
      );
      return Promise.all(hotelPromises); // Resolve all promises
    },
    {
      enabled: bookings.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center">No bookings found.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((booking:any, index:number) => {
            const hotel = hotelsData[index] || {};
            return (
              <div
                key={booking._id}
                className="flex bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-sm transition-shadow duration-300 hover:shadow-purple-500/50"
                onClick={() => navigate(`/hotel/${booking.hotelId}`)}
              >
                <img
                  src={hotel.imageUrls?.[0] || "/fallback-image.jpg"} // Use fallback image if none
                  alt={hotel.name || "Hotel Image"}
                  className="w-1/3 h-full object-cover rounded-l-lg"
                />
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{hotel.name || "Unknown Hotel"}</h2>
                    <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                    <p className="text-gray-600">
                      Guests: {booking.adultCount} Adults, {booking.childCount} Children
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold">Total Cost: ${booking.totalCost.toFixed(2)}</p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
