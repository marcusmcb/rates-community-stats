import "./datacard.css"

const DataCard = ({ added, entries }) => {
  return (
    <div className="data-card">
      <div className="card-header">
        <strong>{added}</strong>
        <span>{entries.length}</span>
      </div>
      <hr />
      {entries.map((entry, idx) => (
        <div key={idx} className="entry">
          <div>{entry.title}</div>
          <div>{entry.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default DataCard