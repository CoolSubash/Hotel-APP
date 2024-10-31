import { useQuery } from "react-query";
import * as apiClient from "../API-CLIENT";
import { useSearchContext } from "../contexts/SearchContext";
import { useState } from "react";
import StarRating from "../components/StarRating";
import TypeFilter from "../components/TypeFilter";
import FacilityFilter from "../components/FacilityFilter";
import HotelCard from "../components/HotelCard";

// Type for Booking schema
export type Booking = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  userId: string;
  totalCost: number;
};

// Type for Hotel schema
export type Hotel = {
  _id: number;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: Booking[];
};

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const handlePageChange = (pageNumber: number) => {
    setSelectedPrice(selectedPrice);
    setPage(pageNumber);
  };

  const handleStarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    star: string
  ) => {
    setSelectedStars((prevValue) => {
      return event.target.checked
        ? [...prevValue, star]
        : prevValue.filter((val) => val !== star);
    });
  };

  const handleTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setSelectedHotelTypes((prevValue) => {
      return event.target.checked
        ? [...prevValue, type]
        : prevValue.filter((val) => val !== type);
    });
  };

  const handleFacilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    facility: string
  ) => {
    setSelectedFacilities((prevValue) => {
      return event.target.checked
        ? [...prevValue, facility]
        : prevValue.filter((val) => val !== facility);
    });
  };

  const handlefilterSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isLoading } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.SearchHotel(searchParams)
  );

  const pages = hotelData?.pagination?.pages;
  const hotelNumber = hotelData?.pagination?.total;

  return (
    <div className="flex">
      <div className="flex gap-2 w-full">
        {/* Left Filter Section */}
        <div className="w-1/5 h-full flex flex-col gap-3">
          <div className="p-3 bg-orange-400 text-white">Filter By:</div>
          <StarRating handleChange={handleStarChange} />
          <TypeFilter handleChange={handleTypeChange} />
          <FacilityFilter handleChange={handleFacilityChange} />
        </div>

        {/* Right Hotel Cards Section */}
        <div className="w-4/5 ml-1/5 flex flex-col gap-4 border border-gray-400 p-3">
          {" "}
          {/* Removed min-h-screen */}
          <div className="hotel-top-container flex justify-between items-center p-4 bg-gray-100">
            <div className="hotel-found">
              <p className="font-bold text-gray-800">
                {hotelNumber > 0
                  ? `${hotelNumber} Hotels Found`
                  : hotelNumber === 0
                  ? "No Hotels Found"
                  : "Loading..."}{" "}
                {/* Add a loading state or fallback message */}
              </p>
            </div>
            <div className="sorting">
              <select
                name="sorting"
                id="sort"
                value={sortOption}
                onChange={handlefilterSort}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort By</option>
                <option value="StarRating">Star Rating</option>
                <option value="PriceByDesc">Price (High to Low)</option>
                <option value="PriceByAsc">Price (Low to High)</option>
              </select>
            </div>
          </div>
          {/* Hotel List Section */}
          <div className="hotel-list-container flex flex-grow flex-col w-full items-center ">
            {isLoading ? (
               <div className="flex items-center justify-center h-full">
               <div className="loader"></div> {/* Add your loading circle here */}
             </div>
            ) : hotelNumber === 0 ? (
              <div className="flex flex-col justify-center text-center h-full w-full text-lg font-bold text-orange-800">
              <span role="img" aria-label="no hotels" className="mr-2">🏨</span>
              No hotels found yet, but the perfect one is out there waiting for you! 
              <span role="img" aria-label="magnifying glass" className="mx-2">🔍</span>
              Try adjusting your filters to explore more options.
              <span role="img" aria-label="sparkles" className="ml-2">✨</span>
            </div>
            ) : (
              hotelData?.data?.map((value: Hotel, index: number) => (
                <HotelCard key={index} hotel={value} />
              ))
            )}
          </div>
          {/* Pagination Section */}
          <div className="pagination flex flex-row gap-2 justify-center">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                onClick={() => handlePageChange(i + 1)}
                key={i}
                className="bg-blue-500 py-3 px-5 rounded text-white transition duration-300"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
