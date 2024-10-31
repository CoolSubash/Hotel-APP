import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../pages/Search.tsx';

type HotelCardProps = {
  hotel: Hotel;
};

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { _id, name, type, facilities, pricePerNight, starRating, imageUrls,description } = hotel;

  return (
    <div className=" flex gap-3 p-3 border border-gray-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ">
      {/* Image on the Left */}
      <div className='w-2/5 h-[300px]'>
        <img 
          src={imageUrls[0]} 
          alt={`${name} thumbnail`} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hotel Info on the Right */}
      <div className='w-3/5'>
        {/* Name and Type */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-md">{type}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center my-1">
          <span className="text-yellow-500 text-md">
            {"★".repeat(starRating)}
          </span>
          <span className="text-gray-500 text-xs ml-1">({starRating} stars)</span>
        </div>
        
        <div className="description my-4">
            <span className='text-gray-500'>{description.slice(0,300)}...</span>
        </div>
        {/* Facilities */}
        <div className="flex gap-1 flex-wrap mt-1 text-xs text-gray-600">
          {facilities?.slice(0, 2).map((facility: string, index: number) => (
            <span 
              key={index} 
              className="bg-gray-200 px-2 py-1 rounded-full"
            >
              {facility}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4 text-md flex justify-between font-semibold text-gray-800">
            <p>  ${pricePerNight} / night</p>
            <Link 
            to={`/hotel/${_id}`} 
            className="text-orange-500 font-semibold text-sm hover:underline "
          >
            View More
          </Link>

        </div>

        {/* View More Button */}
       
      </div>
    </div>
  );
};

export default HotelCard;
