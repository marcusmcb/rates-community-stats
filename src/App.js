import React, { useState, useEffect, Fragment } from 'react'
import Papa from 'papaparse';
import DataCard from './components/DataCard';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [processedData, setProcessedData] = useState({})

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
          console.log(parsedData)
          const dataByAdded = processData(parsedData.data);
          console.log("PD: ", dataByAdded)
          setProcessedData(dataByAdded)
          setData(parsedData.data.map((item, index) => ({ ...item, originalOrder: index })));
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
    const mappedData = parsedData.reduce((acc, curr) => {
      const { title, artist, added } = curr;
      if (!acc[added]) {
        acc[added] = [];
      }
      acc[added].push({ title, artist });
      return acc;
    }, {});
    return mappedData;
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.added.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDataEntries = Object.entries(processedData).sort((a, b) => b[1].length - a[1].length);

  return (
    <Fragment>
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '24px' }}>
        Rate's Community Stats
      </div>
      <div className="cardContainer">
        {sortedDataEntries.map(([added, entries], index, arr) => {
          // Render every two cards as a pair
          if (index % 2 === 0) {
            return (
              <div key={added} className="cardRow">
                <DataCard added={added} entries={entries} />
                {arr[index + 1] && <DataCard added={arr[index + 1][0]} entries={arr[index + 1][1]} />}
              </div>
            );
          }
          // For odd indices, don't render anything (since we're already rendering them as part of the previous pair)
          return null;
        })}
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
}

export default App;
