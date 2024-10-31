import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../contexts/SearchContext';

const SearchBar = () => {
  const searchParams = useSearchContext();
  const [destination, setDestination] = useState(searchParams.destination);
  const [adults, setAdults] = useState(searchParams.adultCount);
  const [children, setChildren] = useState(searchParams.childCount);
  const [startDate, setStartDate] = useState<Date>(searchParams.checkIn);
  const [endDate, setEndDate] = useState<Date>(searchParams.checkOut);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmedEndDate = endDate ?? new Date();
    searchParams.saveSearch(destination, adults, children, startDate, confirmedEndDate);
    navigate("/search");
  };

  // const dateChange=(date as any)=>{
  //   setStartDate(date);
  //   searchParams.checkoutHandle(date);
  // }

  return (

    
    <form 
      className="-mt-4 mx-auto flex gap-6 justify-between p-3 shadow-md  bg-blue-600" 
      onSubmit={handleSearch}
    >
    
        
        <div className="flex flex-col">
          <label className="text-white font-medium mb-2" htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
           
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-2" htmlFor="adults">Adults</label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            min="1"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-2" htmlFor="children">Children</label>
          <input
            type="number"
            id="children"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white font-medium mb-2">Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date)=>setStartDate(date as any)}
            selectsStart
            startDate={startDate}
            maxDate={endDate}
            minDate={new Date()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
            placeholderText="Check-in"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-2">Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date)=>setEndDate(date as any)}
            selectsEnd
            startDate={endDate}
            minDate={startDate}
            
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
            placeholderText="Check-out"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
     

      <div className="flex justify-center mt-8">
        <button 
          type="submit" 
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      
     
    </form>
  );
};

export default SearchBar;
