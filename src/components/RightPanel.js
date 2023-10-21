import React from "react";

import "./panels.css"

const RightPanel = ({ data }) => {
  return (
    <div className="right-panel panel">      
      {data.map((entry, idx) => (
        <div key={idx} className="entry">
          <div style={{ fontWeight: '600', fontSize: '18px' }}>{entry.title}</div>
          <div style={{ fontSize: '16px' }}>{entry.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default RightPanel;
