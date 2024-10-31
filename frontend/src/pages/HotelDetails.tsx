// src/components/HotelDetails.tsx
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as apiClient from "../API-CLIENT";
import { useToast } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";

type Hotel = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number; // Maximum number of adults allowed
  childCount: number; // Maximum number of children allowed
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
};

const HotelDetails: React.FC = () => {
  const searchParams = useSearchContext();
  const { isLoggedIn } = useToast();
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState<Date>(searchParams.checkIn);
  const [endDate, setEndDate] = useState<Date>(searchParams.checkOut);
  const [adults, setAdults] = useState<number>(searchParams.adultCount || 1);
  const [children, setChildren] = useState<number>(
    searchParams.childCount || 0
  );

  const location = useLocation();

  const navigate = useNavigate();
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery<Hotel | undefined>(
    ["hotelDetails", id],
    () => apiClient.fetchHotelSingle(id || ""),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const handleBookSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchParams.saveSearch(
      searchParams.destination,
      adults,
      children,
      startDate,
      endDate
    );
    navigate("/sign-in", {
      state: {
        from: {
          location,
        },
      },
    });
  };

  const handleBookSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchParams.saveSearch(
      searchParams.destination,
      adults,
      children,
      startDate,
      endDate
    );
    navigate(`/hotel/${id}/booking`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="ml-4 text-lg font-semibold text-gray-700">
          Loading hotel details...
        </p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        <p>
          Error fetching hotel details. It seems like the hotel is not there.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        <p>Error fetching hotel details. Please try again.</p>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Image Slider */}
      <div className="w-full">
        {hotel?.imageUrls.length > 1 ? (
          // Show slider if more than one image
          <Slider {...sliderSettings}>
            {hotel.imageUrls.map((url: string, index: number) => (
              <div key={index}>
                <img
                  src={url}
                  alt={hotel.name}
                  className="w-full h-[600px] object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        ) : (
          // Display a single image without slider if only one image is available
          <div>
            <img
              src={hotel?.imageUrls[0]}
              alt={hotel?.name}
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Hotel Details and Booking Form */}
      <div className="w-full my-3 space-y-2">
        <h2 className="text-2xl font-bold">{hotel?.name.toUpperCase()}</h2>

        <p className="text-gray-700">
          {hotel.city.charAt(0).toUpperCase() + hotel?.city.slice(1)},{" "}
          {hotel.country.charAt(0).toUpperCase() + hotel?.country.slice(1)}
        </p>

        <div className="flex items-center gap-2 my-1">
          <span>Rating:</span>
          <span className="text-yellow-500 text-md">
            {"★".repeat(hotel.starRating)}
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-500">
          Type: {hotel.type.charAt(0).toUpperCase() + hotel.type.slice(1)}
        </p>
        <div className="flex flex-wrap gap-2">
          <p className="font-semibold text-gray-500">Facilities:</p>
          {hotel.facilities.map((facility, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-500 text-white rounded-full uppercase text-xs font-semibold"
            >
              {facility.charAt(0).toUpperCase() + facility.slice(1)}
            </span>
          ))}
        </div>
        <p className="text-lg font-semibold text-blue-600">
          Price per Night: ${hotel?.pricePerNight}
        </p>

        <div className="hotel-container flex gap-2">
          <div className="text-content w-4/5 py-3">
            <h1 className="text-blue-500 font-bold text-xl">
              Hotel Description:
            </h1>
            <div>
              {hotel?.description.length > 1000 ? (
                hotel.description
              ) : (
                <>
                  {hotel.description}
                  <p>
                    The units at the apartment complex come with air
                    conditioning, a seating area, a flat-screen TV with
                    streaming services, a kitchen, a dining area, and a private
                    bathroom equipped with a hair dryer, a shower, and free
                    toiletries. An oven, a microwave, and a toaster are also
                    provided, along with a coffee machine. All units at the
                    apartment complex are fitted with bed linen and towels.
                  </p>
                  <p>
                    Guests will be able to enjoy activities in and around
                    Atlanta, such as hiking. Piedmont Park is 2.2 miles from
                    Studios On 25th by BCA Furnished Apartments, while the
                    Atlanta Botanical Garden is 2.4 miles away.
                  </p>
                  <p>
                    Couples particularly appreciate the location, rating it 9.6
                    for a two-person trip.
                  </p>
                </>
              )}
            </div>
            {/* <p className="text-gray-600 my-2">
              {hotel.description}
            </p> */}
          </div>

          {/* Booking Form */}
          <form
            className="space-y-4 w-1/4 h-full p-8 bg-orange-400 rounded-lg shadow-lg text-white"
            onSubmit={isLoggedIn ? handleBookSubmit : handleBookSignIn}
          >
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Check-In
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                selectsStart
                startDate={startDate}
                maxDate={endDate}
                minDate={new Date()}
                className="w-full p-3 border border-orange-300 rounded-lg bg-orange-700 placeholder-white text-white focus:outline-none focus:border-orange-400"
                placeholderText="Check-in"
                dateFormat="MMMM d, yyyy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Check-Out
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                startDate={startDate}
                minDate={startDate}
                className="w-full p-3 border border-orange-300 rounded-lg bg-orange-700 placeholder-white text-white focus:outline-none focus:border-orange-400"
                placeholderText="Check-out"
                dateFormat="MMMM d, yyyy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Adults
              </label>
              <input
                type="number"
                min={1}
                max={hotel.adultCount}
                value={adults}
                onChange={(e) =>
                  setAdults(
                    Math.min(hotel.adultCount, parseInt(e.target.value))
                  )
                }
                className="w-full p-3 border border-orange-300 rounded-lg bg-orange-700 placeholder-white text-white focus:outline-none focus:border-orange-400"
                placeholder="Number of adults"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Children
              </label>
              <input
                type="number"
                min={0}
                max={hotel.childCount}
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-full p-3 border border-orange-300 rounded-lg bg-orange-700 placeholder-white text-white focus:outline-none focus:border-orange-400"
                placeholder="Number of children"
              />
            </div>
            {isLoggedIn ? (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold mt-4"
              >
                Book Now
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold mt-4"
              >
                Sign In to Book
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
