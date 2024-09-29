export type UserType={
    _id:string,
     email:string,
     password:string,
     firstName:string,
     lastName:string
}


    // Define an interface for your schema
export type HotelType=  {
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
    bookings: any[]; 
  }

  // Define the BookingType
export type BookingType = {
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
