import { useState } from "react";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, star: string) => void;
};

const StarRating: React.FC<Props> = ({ handleChange }) => {
  const handleStarChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, event.target.value);
  };

  return (
    <div>
      <h3>Rating</h3>
      {["1", "2", "3", "4", "5"].map((rating) => (
        <div key={rating}>
          <input
            type="checkbox" // Change to "radio" if single selection is preferred
            id={`star-${rating}`}
            value={rating}
            onChange={handleStarChecked}
          />
          <label htmlFor={`star-${rating}`} className="px-2">{rating} Star</label>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
