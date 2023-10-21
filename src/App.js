import React, { useState, useEffect, Fragment } from 'react';
import Papa from 'papaparse';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdded, setSelectedAdded] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("/data/rate_wonder_spotify_stream_september.csv")
        .then(response => response.text())
        .then(data => {
          const parsedData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            delimiter: ','
          });

          const dataByAdded = processData(parsedData.data);
          setProcessedData(dataByAdded);
          setData(parsedData.data.map((item, index) => ({ ...item, originalOrder: index })));

          // Default to the top "added" value after processing
          const topAdded = Object.keys(dataByAdded).sort((a, b) => dataByAdded[b].length - dataByAdded[a].length)[0];
          setSelectedAdded(topAdded);
        });
    };

    fetchData();
  }, []);

  const handleSort = (columnName) => {
    let sortedData = [...data];
    if (columnName === 'originalOrder') {
      if (sortDirection === 'asc') {
        sortedData.sort((a, b) => a.originalOrder - b.originalOrder);
        setSortDirection('desc');
      } else {
        sortedData.sort((a, b) => b.originalOrder - a.originalOrder);
        setSortDirection('asc');
      }
    } else {
      if (sortDirection === 'asc') {
        sortedData.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : -1);
        setSortDirection('desc');
      } else {
        sortedData.sort((a, b) => (a[columnName] < b[columnName]) ? 1 : -1);
        setSortDirection('asc');
      }
    }
    setSortedColumn(columnName);
    setData(sortedData);
  };

  const processData = (parsedData) => {
    return parsedData.reduce((acc, curr) => {
      const { title, artist, added } = curr;
      if (!acc[added]) {
        acc[added] = [];
      }
      acc[added].push({ title, artist });
      return acc;
    }, {});
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.added.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '24px' }}>
        Rate's Community Stats
      </div>

      <div className="panels-container">
        <LeftPanel data={processedData} selectedAdded={selectedAdded} onSelect={setSelectedAdded} />
        <RightPanel data={processedData[selectedAdded] || []} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '25px' }}>
        <input
          style={{ textAlign: 'center' }}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('originalOrder')}>Order {sortedColumn === 'originalOrder' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('title')}>Title {sortedColumn === 'title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('artist')}>Artist {sortedColumn === 'artist' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('added')}>Added {sortedColumn === 'added' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.originalOrder + 1}</td>
              <td>{item.title}</td>
              <td>{item.artist}</td>
              <td>{item.added}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default App;
