import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../API-CLIENT";
import { useQuery } from "react-query";
import BookingForm from "../forms/Booking/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.STRIPE_KEY);

// Type for Hotel schema
export type Hotel = {
  id: string;
  name: string;
  address: string;
  pricePerNight: number;
};

const BookingFormPage: React.FC = () => {
  const { id } = useParams();
  const searchParams = useSearchContext();

  
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch hotel data using React Query
  const { data: hotelInfo } = useQuery(
    ["hotelInfo", id],
    () => apiClient.fetchHotelSingle(id as string),
    {
      enabled: !!id,
    }
  );

  // Calculate the number of days and total price when dates change
  useEffect(() => {
      const days = Math.ceil((searchParams.checkOut.getTime() - searchParams.checkIn.getTime()) / 86400000);
      setNumberOfDays(days);
      setTotalPrice(days * (hotelInfo?.pricePerNight || 0));
    
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto flex gap-10 p-5">
        {/* Left side: Hotel details */}
        <div className="w-1/2 border p-5 h-full bg-gray-100">
          {hotelInfo ? (
            <>
              <div className="hotel-address inline-flex gap-1">
                <span>Location: </span>
                <span className="text-gray-700">{hotelInfo.city}</span>
              </div>
              <div className="hotel-name my-2">
                <p>{hotelInfo.name}</p>
              </div>
              <div className="my-5">
                <label>Check-In Date: </label>
                <p className="font-semibold">{searchParams.checkIn.toDateString()}</p>
                
              </div>
              <div className="my-3">
                <label>Check-Out Date: </label>
                <p className="font-semibold">{searchParams.checkOut.toDateString()}</p>
          
              </div>
              <div className="guest-info flex gap-2 my-2">
                <p>Adults: <span>{searchParams.adultCount}</span></p>
                <p>Child: <span>{searchParams.childCount}</span></p>
              </div>
              <p>Number of Days: {numberOfDays}</p>
              <p className="my-3">Price per Night: ${hotelInfo.pricePerNight}</p>
            </>
          ) : (
            <p>Loading hotel details...</p>
          )}
        </div>
        {/* Right side: Booking form */}
        <BookingForm
          price={totalPrice}
          hotelId={id as string}
          checkIn={searchParams.checkIn}
          checkOut={searchParams.checkOut}
          adultCount={searchParams.adultCount}
          childCount={searchParams.childCount}
         

        />
      </div>
    </Elements>
  );
};

export default BookingFormPage;
