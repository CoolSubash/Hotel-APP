
import { Inputs } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_URL || " ";

import { BookingCreate } from "./forms/Booking/BookingForm";
//  Login, Signup ,Singout Functionality Start

export const Register = async (data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON
      credentials: "include", // Enables sending cookies
    });

    if (!response.ok) {
      // If response is not ok, throw an error
      const errorData = await response.json();
      throw new Error(
        errorData.message || "An error occurred, please try again"
      );
    }

    const responseData = await response.json(); // Parse the JSON response
    return responseData; // Return the response data
  } catch (err: any) {
    // Handle errors appropriately
    throw new Error(err.message || "An error occurred, please try again");
  }
};

export const login = async (formData: Inputs) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

// ***************----- Login, Signup ,Signout Functionality finish --- **********

// Token Validation

export const validateToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validateToken`, {
      method: "GET", // Use GET method for validation
      credentials: "include", // Include credentials for cross-origin requests
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Error validating token: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (err: any) {
    console.error("Error validating token:", err); // Log the error
    throw new Error(err.message); // Return the error message
  }
};

// ******* My hotel Api logic Start *******
// ADDING A Hotel

export const addHotel = async (data: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error while saving: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response
    return body; // Return the parsed data
  } catch (err: any) {
    console.error("Error validating token:", err); // Log the error
    throw new Error(err.message); // Return the error message
  }
};

export const fetchMyHotel = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response
    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

export const fetchMyHotelSingle = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response

    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

export const UpdateHotel = async (data: FormData, id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error while saving: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response
    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

// ******* My hotel Api logic End *******

// ******* API Hotel  logic Start *******

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const SearchHotel = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState({ path: newUrl }, "", newUrl);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/hotel/search?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This will include cookies in the request
      }
    );

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json();

    // Parse the JSON response
    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

export const fetchHotelSingle = async (id: string) => {
  try {
    console.log(id);
    const response = await fetch(`${API_BASE_URL}/api/hotel/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response
   
    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response

    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};

//  Payment Intent



export const paymentIntent = async (price: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/booking/payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price
      }),
      credentials: "include", // This will include cookies in the request
    });

    if (!response.ok) {
      throw new Error(`Error while Fetching: ${response.statusText}`);
    }

    const body = await response.json(); // Parse the JSON response

    return body; // Return the parsed data
  } catch (err: any) {
    throw new Error(err.message); // Return the error message
  }
};



// Booking Create

export const createBooking = async (bookingData:BookingCreate) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
      credentials: 'include', // This allows sending cookies and HTTP authentication
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    throw new Error(error.message); // Return the error message
  }
};



// api.ts (or wherever you manage API calls)
export const fetchBookings = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/booking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This allows sending cookies and HTTP authentication
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`No Hotel Found`);
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    console.log(error)
    
    throw new Error(error.message); // Return the error message
   
  }
};




