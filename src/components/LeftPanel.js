import React from "react";
import "./panels.css";

const LeftPanel = ({ data, selectedAdded, onSelect }) => {
  const sortedDataEntries = Object.entries(data).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="left-panel panel">
      {sortedDataEntries.map(([added, entries]) => (
        <div key={added} className={`added-entry ${added === selectedAdded ? 'selected' : ''}`} onClick={() => onSelect(added)}>
          <div className="added-label added-name">{added}</div>
          {
            entries.length === 1 ? (<div>({entries.length} song)</div>) : (<div>({entries.length} songs)</div>)
          }
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
