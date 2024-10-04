import { FormProvider, useForm } from "react-hook-form";
import Detail from "./Detail";
import Type from "./Type";
import Facility from "./Facility";
import Image from "./Image";
import Guest from "./Guest";

export type HotelForm = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number; // Should be between 1 and 5
  imageFiles: File[];
};
type onsave={
    onSave:(data:FormData)=>void;
    isLoading:boolean
}
const ManageHotel = ({onSave, isLoading}:onsave) => {
  const formData = useForm<HotelForm>();
  const { handleSubmit,reset } = formData;

  const onSubmit = (data:any) => {
    console.log(data)
    const formDataToSend = new FormData();  // Using FormData to handle file uploads
    formDataToSend.append('name', data.name);
    formDataToSend.append('city', data.city);
    formDataToSend.append('country', data.country);
    formDataToSend.append('description', data.description);
    formDataToSend.append('type', data.type);
    formDataToSend.append('adultCount', data.adultCount.toString());
    formDataToSend.append('childCount', data.childCount.toString());
    formDataToSend.append('pricePerNight', data.pricePerNight.toString());
    formDataToSend.append('starRating', data.starRating.toString());

    // Append image files

    data.facilities.forEach((facility:string, index:number) => {
      formDataToSend.append(`facilities[${index}]`, facility);  // Append each file
    });
    Array.from(data.imageFiles).forEach((file:any)=>{
      formDataToSend.append(`imageFiles`, file);  // Append each file
    })
    // Now we send the form data, including files
    onSave(formDataToSend);
    reset()
  };
  return (
    <>
      <FormProvider {...formData}>
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <Detail />
        <Type></Type>
        <Facility />
        <Guest />
        <Image />
        <span>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
          {isLoading? "Saving..":"Save.."}
          </button>
        </span>
        </form>
      </FormProvider>
    </>
  );
};

export default ManageHotel;
