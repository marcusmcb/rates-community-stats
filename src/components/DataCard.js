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
        <strong style={{ color: 'khaki' }}>{added}</strong>
        {
          entries.length === 1 ? (<span style={{ marginLeft: '10px' }}>({entries.length} song)</span>) : (<span style={{ marginLeft: '10px' }}>({entries.length} songs)</span>)
        }

        <span className="arrow-icon" onClick={toggleDetails}>
          {showDetails ? "↑" : "↓"}
        </span>
      </div>

      {showDetails && entries.map((entry, idx) => (
        <div key={idx} className="entry">
          <div style={{ fontWeight: '600', fontSize: '16px'}}>{entry.title} </div>
          <div style={{ color: 'bisque' }}>{entry.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
