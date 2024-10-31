const hotelFacilities = [
  "Free WiFi", "Parking", "Airport Shuttle", "Family Rooms", 
  "Non-Smoking Rooms", "Outdoor Pool", "Spa", "Fitness Center"
];

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, facility: string) => void;
};

const FacilityFilter: React.FC<Props> = ({ handleChange }) => {
  const filterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, event.target.value); // Pass the change to parent
  };

  return (
    <div>
      <h3>Facilities</h3>
      {hotelFacilities.map((facility) => {
        const id = `facility-${facility.replace(/\s+/g, "-").toLowerCase()}`; // Unique id
        return (
          <div key={facility}>
            <input
              type="checkbox"
              id={id} // Set unique id
              value={facility}
              onChange={filterChange}
            />
            <label htmlFor={id} className="px-2">{facility}</label> {/* Use htmlFor */}
          </div>
        );
      })}
    </div>
  );
};

export default FacilityFilter;
