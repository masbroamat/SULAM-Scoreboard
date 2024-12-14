import React from "react";
import "./GroupColumn.css";

const GroupColumn = ({ groupName, scores, onUpdateScore }) => {
  const handleInputChange = (e, index) => {
    let newScore = parseInt(e.target.value) || 0;  // Parse the value as an integer

    // Ensure the value doesn't exceed the max limit of 100000 or go below 0
    // if (newScore > 150000) newScore = 100000;
    if (newScore < 0) newScore = 0;

    // Call the parent function to update the score for the specific checkpoint (index + 1)
    onUpdateScore(index + 1, newScore);
  };

  return (
    <div className="group-column">
      <h3>{groupName}</h3>
      <div className="checkpoints">
        {scores.map((score, index) => (
          <div key={index} className="checkpoint">
            <label>Checkpoint {index + 1}</label>
            <input
              type="number"
              min="0"
              max="100000"
              value={score}
              onChange={(e) => handleInputChange(e, index)}  // Handle change when user edits the value
              onBlur={(e) => handleInputChange(e, index)}    // Optionally save on blur (focus out)
            />
          </div>
        ))}
      </div>
      <div className="group-total">
        Total: <br/>RM{scores.reduce((sum, score) => sum + score, 0).toLocaleString()}
      </div>
    </div>
  );
};

export default GroupColumn;
