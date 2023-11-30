import React, { useState, useEffect, Fragment } from 'react'
import Papa from 'papaparse'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import DataCard from './components/DataCard'
import SongCard from './components/SongCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
// import BillboardChart from './components/billboardui/chart'

import './App.css'

const App = () => {
	const [data, setData] = useState([])
	const [processedData, setProcessedData] = useState({})
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedAdded, setSelectedAdded] = useState(null)
	const [sortDirection, setSortDirection] = useState('asc')
	const [sortedColumn, setSortedColumn] = useState(null)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [selectedPlaylist, setSelectedPlaylist] = useState('October')

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		const fetchData = (playlist) => {
			fetch(`/data/rate_wonder_spotify_stream_${playlist.toLowerCase()}.csv`)
				.then((response) => response.text())
				.then((data) => {
					const parsedData = Papa.parse(data, {
						header: true,
						skipEmptyLines: true,
						delimiter: ',',
					})
					console.log(parsedData)
					const dataByAdded = processData(parsedData.data)
					setProcessedData(dataByAdded)
					setData(
						parsedData.data.map((item, index) => ({
							...item,
							originalOrder: index,
						}))
					)
					const topAdded = Object.keys(dataByAdded).sort(
						(a, b) => dataByAdded[b].length - dataByAdded[a].length
					)[0]
					setSelectedAdded(topAdded)
				})
		}
		fetchData(selectedPlaylist)
	}, [selectedPlaylist])

	const createSpotifyLink = (artist, title) => {
		const queryString = encodeURIComponent(`${artist} ${title}`)
		return `https://open.spotify.com/search/${queryString}`
	}

	const handleSort = (columnName) => {
		let sortedData = [...data]
		if (columnName === 'originalOrder') {
			if (sortDirection === 'asc') {
				sortedData.sort((a, b) => a.originalOrder - b.originalOrder)
				setSortDirection('desc')
			} else {
				sortedData.sort((a, b) => b.originalOrder - a.originalOrder)
				setSortDirection('asc')
			}
		} else {
			if (sortDirection === 'asc') {
				sortedData.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1))
				setSortDirection('desc')
			} else {
				sortedData.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1))
				setSortDirection('asc')
			}
		}
		setSortedColumn(columnName)
		setData(sortedData)
	}

	const processData = (parsedData) => {
		return parsedData.reduce((acc, curr) => {
			const { title, artist, added } = curr
			if (!acc[added]) {
				acc[added] = []
			}
			acc[added].push({ title, artist })
			return acc
		}, {})
	}

	const filteredData = data.filter(
		(item) =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.added.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<Fragment>
			{/* <BillboardChart/> */}
			<div className='main-app'>
				<Navbar selectedPlaylist={selectedPlaylist} />
				{windowWidth > 860 ? (
					<div>
						<div className='panels-container'>
							<LeftPanel
								data={processedData}
								selectedAdded={selectedAdded}
								onSelect={setSelectedAdded}
								selectedPlaylist={selectedPlaylist}
								onPlaylistChange={setSelectedPlaylist}
							/>
							<RightPanel data={processedData[selectedAdded] || []} />
						</div>
					</div>
				) : (
					<div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<select
								value={selectedPlaylist}
								onChange={(e) => setSelectedPlaylist(e.target.value)}
								style={{
									padding: '5px',
									marginLeft: '5px',
									marginBottom: '5px',
									boxSizing: 'border-box',
									width: '70%',
									fontFamily: 'Fira Sans'
								}}
							>
								<option value='October'>October 2023 Playlist</option>
								<option value='September'>September 2023 Playlist</option>
							</select>
						</div>

						{Object.entries(processedData)
							.sort((a, b) => b[1].length - a[1].length)
							.map(([added, entries]) => (
								<DataCard key={added} added={added} entries={entries} />
							))}
					</div>
				)}
				<div
					style={{
						textAlign: 'center',
						fontSize: '28px',
						fontWeight: '600',
						padding: '30px',
						color: 'khaki',
					}}
				>
					The Full Playlist
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '20px',
						marginLeft: '5%',
						marginRight: '5%',
					}}
				>
					<input
						style={{ textAlign: 'center', width: '50%', height: '20px', fontFamily: 'Fira Sans' }}
						type='text'
						placeholder='Search by title, artist, or Spotify screen-name'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{windowWidth > 860 ? (
					filteredData.length > 0 ? (
						<div
							style={{ overflowX: 'auto', marginLeft: '5%', marginRight: '5%' }}
						>
							<table>
								<thead>
									<tr>
										<th
											onClick={() => handleSort('originalOrder')}
											style={{ color: 'khaki' }}
										>
											Order{' '}
											{sortedColumn === 'originalOrder'
												? sortDirection === 'asc'
													? '↑'
													: '↓'
												: ''}
										</th>
										<th
											onClick={() => handleSort('artist')}
											style={{ color: 'khaki' }}
										>
											Artist{' '}
											{sortedColumn === 'artist'
												? sortDirection === 'asc'
													? '↑'
													: '↓'
												: ''}
										</th>
										<th
											onClick={() => handleSort('title')}
											style={{ color: 'khaki' }}
										>
											Title{' '}
											{sortedColumn === 'title'
												? sortDirection === 'asc'
													? '↑'
													: '↓'
												: ''}
										</th>
										<th
											onClick={() => handleSort('added')}
											style={{ color: 'khaki' }}
										>
											Added By{' '}
											{sortedColumn === 'added'
												? sortDirection === 'asc'
													? '↑'
													: '↓'
												: ''}
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.map((item, index) => (
										<tr key={index}>
											<td>{item.originalOrder + 1}</td>
											<td>{item.artist}</td>
											<td>
												<a
													href={createSpotifyLink(item.artist, item.title)}
													target='_blank'
													rel='noopener noreferrer'
													style={{ color: 'inherit', textDecoration: 'none' }}
												>
													{item.title}
													<FontAwesomeIcon
														icon={faHeadphones}
														style={{
															marginLeft: '10px',
															color: 'khaki',
															fontSize: '13px',
														}}
													/>
												</a>
											</td>
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
				) : filteredData.length > 0 ? (
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
				)}
				<Footer />
			</div>
		</Fragment>
	)
}

export default App

// add responsive layout for main page components
// add playlist percentages for each viewer's picks
// apply same left/right margins to table component as panel components
