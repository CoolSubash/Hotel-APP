

import { Inputs } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_URL || " ";



export const Register = async (data:any) => {
   
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convert data to JSON
        credentials: 'include', // Enables sending cookies
      });
  
      if (!response.ok) {
        // If response is not ok, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred, please try again");
      }
  
      const responseData = await response.json(); // Parse the JSON response
      return responseData; // Return the response data
    } catch (err:any) {
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


  export const validateToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/validateToken`, {
        method: 'GET', // Use GET method for validation
        credentials: 'include' // Include credentials for cross-origin requests
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
  
