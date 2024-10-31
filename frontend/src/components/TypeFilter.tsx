const hotelTypes = [
  "Budget", "Boutique", "Luxury", "Ski Resort", "Business", "Family",
  "Romantic", "Hiking Resort", "Cabin", "Beach Resort", "Golf Resort",
  "Motel", "All Inclusive", "Pet Friendly", "Self Catering"
];

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

const TypeFilter: React.FC<Props> = ({ handleChange }) => {
  const filterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, event.target.value);
  };

  return (
    <div>
      <h3 className="my-2">Types</h3>
      {hotelTypes.map((type) => {
        const id = `type-${type.replace(/\s+/g, "-").toLowerCase()}`; // Generate a unique id
        return (
          <div key={type}>
            <input
              type="checkbox"
              id={id} // Set unique id
              value={type}
              onChange={filterChange}
            />
            <label htmlFor={id} className="px-2">{type}</label> {/* Use htmlFor to link the label */}
          </div>
        );
      })}
    </div>
  );
};

export default TypeFilter;
