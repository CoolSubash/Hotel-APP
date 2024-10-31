import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "../../API-CLIENT"; // Replace with actual API client
import { useMutation, useQuery } from "react-query";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import { useToast } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type BookingFormProps = {
  price: number;
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export type BookingFormNameprops = BookingFormProps & {
  firstName: string;
  lastName: string;
  email: string;
}

export type BookingCreate = BookingFormProps & BookingFormNameprops & {
  totalCost:number
}
  


const BookingForm: React.FC<BookingFormProps> = ({ price, hotelId, checkIn, checkOut, adultCount, childCount }) => {
  const { register, setValue, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [Userdata, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useToast();
  const taxRate = 0.05; 
  const serviceChargeRate = 0.03; 
  const priceInt = Number(price);
  const totalPriceWithTax = priceInt + priceInt * taxRate + priceInt * serviceChargeRate;
 
  
  const currentUserInfo = useQuery("currentUser", apiClient.fetchCurrentUser, {
    onSuccess: (data) => {
      setValue("firstName", data.firstName || "");
      setValue("lastName", data.lastName || "");
      setValue("email", data.email || "");
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
      });
    },
    onError: (error) => {
      console.error("Failed to fetch current user data:", error);
    },
  });
  console.log(currentUserInfo)

  const createPaymentIntent = useMutation(async (price: number) => {
    return await apiClient.paymentIntent(price);
  }, {
    onError: () => {
      showToast({ message: "Error Please try Again", type: "ERROR" });
    }
  });

  const createBooking = useMutation(async (bookingData: BookingCreate) => {
    return await apiClient.createBooking(bookingData); // Ensure this API exists
  }, {
    onError: () => {
      showToast({ message: "Error creating booking. Please try again.", type: "ERROR" });
    },
    onSuccess: () => {
      // Optionally handle successful booking creation here, like showing a toast
      showToast({ message: "Booking created successfully!", type: "SUCCESS" });
    }
  });

  const handleConfirmBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded. Please refresh and try again.");
      return;
    }
    setIsLoading(true);

    try {
      if (totalPriceWithTax <= 0) {
        throw new Error("Amount should be greater than 0");
      }

      const paymentResult = await createPaymentIntent.mutateAsync(price);
      const clientSecret = paymentResult.clientSecret;

      if (clientSecret) {
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement! },
        });

        if (error) {
          console.error("Payment failed:", error);
          setErrorMessage("Payment failed. Please check your card information.");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          // Create the booking after payment is successful
          const bookingData: BookingCreate = {
            price,
            hotelId,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            firstName: Userdata.firstName,
            lastName: Userdata.lastName,
            email: Userdata.email,
            totalCost:totalPriceWithTax
          };

          await createBooking.mutateAsync(bookingData); // Call API to create booking
          
          // Navigate to the booking confirmation page
          navigate("/my-booking", {
            state: {
              ...bookingData
            } as BookingCreate,
          });
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 border p-5 bg-white">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4">
        <div>
          <label>First Name</label>
          <input
            readOnly
            disabled
            {...register("firstName", { required: "First name is required" })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            readOnly
            disabled
            {...register("lastName", { required: "Last name is required" })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            readOnly
            disabled
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="total-summary p-5 bg-gray-100 rounded-md shadow-md w-full ">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Total Summary</h2>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 font-medium">Base Price:</span>
            <span className="text-lg font-bold text-green-600">${priceInt.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 font-medium">Tax (5%):</span>
            <span className="text-lg font-bold text-green-600">${(priceInt * taxRate).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 font-medium">Service Charge (3%):</span>
            <span className="text-lg font-bold text-green-600">${(priceInt * serviceChargeRate).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 border-t pt-3">
            <span className="text-gray-700 font-medium">Total Price:</span>
            <span className="text-lg font-bold text-green-600">${totalPriceWithTax.toFixed(2)}</span>
          </div>
          <div className="my-4">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          {(totalPriceWithTax <= 0 && errorMessage) && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
