import React, { useState } from "react";
import "./datacard.css";

const DataCard = ({ added, entries }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="data-card">
      <div className="card-header">
        <strong>{added}</strong>
        <span>{entries.length} songs</span>
        <span className="arrow-icon" onClick={toggleDetails}>
          {showDetails ? "↑" : "↓"}
        </span>
      </div>
      <hr />
      {showDetails && entries.map((entry, idx) => (
        <div key={idx} className="entry">
          <div>{entry.title}</div>
          <div>{entry.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
