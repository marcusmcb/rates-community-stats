import React from "react";

import "./panels.css"

const RightPanel = ({ data }) => {
  return (
    <div className="right-panel panel">
      {data.map((entry, idx) => (
        <div key={idx} className="entry">
          <div>{entry.title}</div>
          <div>{entry.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default RightPanel;
