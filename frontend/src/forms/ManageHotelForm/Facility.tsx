import { useFormContext } from "react-hook-form";
import { HotelForm } from "./ManageHotel";

const Facility = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelForm>();
  const hotelFacilities = [
    "Free WiFi",
    "Parking",
    "Airport Shuttle",
    "Family Rooms",
    "Non-Smoking Rooms",
    "Outdoor Pool",
    "Spa",
    "Fitness Center",
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold my-5 mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility,index) => (
          <label key={index} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default Facility;
