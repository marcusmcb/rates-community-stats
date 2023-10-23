import React, { useState, useEffect, Fragment } from 'react';
import Papa from 'papaparse';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import DataCard from './components/DataCard';
import SongCard from './components/SongCard';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdded, setSelectedAdded] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', padding: '15px' }}>
        <a href='https://www.twitch.tv/ratewonder' rel='noreferrer'
          target='_blank' style={{ textDecoration: 'none' }}>Rate's Community Stats</a>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px' }}>
        Community Spotify Playlist #15 - Stream Stats (September 2023)
      </div>

      {windowWidth > 700 ? (
        <div>
          <div className="panels-container">
            <LeftPanel data={processedData} selectedAdded={selectedAdded} onSelect={setSelectedAdded} />
            <RightPanel data={processedData[selectedAdded] || []} />
          </div>
        </div>
      ) : (
        Object.entries(processedData)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([added, entries]) => (
            <DataCard key={added} added={added} entries={entries} />
          ))
      )}
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', padding: '15px' }}>
        The Full Playlist
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginLeft: '5%', marginRight: '5%' }}>
        <input
          style={{ textAlign: 'center' }}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {
        windowWidth > 700 ? (
          filteredData.length > 0 ? (
            <div style={{ overflowX: 'auto', marginLeft: '5%', marginRight: '5%' }}>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('originalOrder')}>Order {sortedColumn === 'originalOrder' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('artist')}>Artist {sortedColumn === 'artist' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('title')}>Title {sortedColumn === 'title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('added')}>Added By {sortedColumn === 'added' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.originalOrder + 1}</td>
                      <td>{item.artist}</td>
                      <td>{item.title}</td>
                      <td>{item.added}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              Sorry, but we can't find that.
            </div>
          )
        ) : (
          filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <SongCard
                key={index}
                title={item.title}
                artist={item.artist}
                added={item.added}
                index={index}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              Sorry, but we can't find that.
            </div>
          )
        )
      }
      <div style={{ textAlign: 'center', fontSize: '12px', padding: '15px' }}>
        <hr />
        Built by <a href='https://www.mcbportfolio.com' rel='noreferrer'
          target='_blank' style={{ textDecoration: 'none' }}>MCB</a>, {currentYear}
      </div>
    </Fragment>
  );
  ;
};

export default App;

// add link to original community Spotify playlist near main page title
// add individual links on songs to Spotify search results
// add responsive layout for main page components
// add link to rate's twitch channel
// add playlist percentages for each viewer's picks
// apply same left/right margins to table component as panel components

