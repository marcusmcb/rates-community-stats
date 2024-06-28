import React, { useState, useEffect, Fragment } from 'react'
import Papa from 'papaparse'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import DataCard from './components/DataCard'
import SongCard from './components/SongCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import createSpotifyLink from './components/helpers/createSpotifyLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'

import './App.css'

const App = () => {
	const [data, setData] = useState([])
	const [processedData, setProcessedData] = useState({})
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedAdded, setSelectedAdded] = useState(null)
	const [sortDirection, setSortDirection] = useState('asc')
	const [sortedColumn, setSortedColumn] = useState(null)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [selectedPlaylist, setSelectedPlaylist] = useState('June')

	// useEffect(() => {
	// 	const spotifyClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	// 	const spotifyClientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
	// 	const playlistId = '2yIGj8H1bTRYTQTrrVsFOj'

	// 	// Method to get Spotify token
	// 	const getSpotifyToken = async () => {
	// 		const response = await fetch('https://accounts.spotify.com/api/token', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 				Authorization:
	// 					'Basic ' + btoa(`${spotifyClientID}:${spotifyClientSecret}`),
	// 			},
	// 			body: 'grant_type=client_credentials',
	// 		})

	// 		const data = await response.json()
	// 		return data.access_token
	// 	}

	// 	// Method to fetch and process playlist data
	// 	const fetchAndProcessPlaylist = async (playlist, accessToken) => {
	// 		const response = await fetch(
	// 			`/data/rate_wonder_spotify_stream_${playlist.toLowerCase()}.csv`
	// 		)
	// 		const text = await response.text()
	// 		const parsed = Papa.parse(text, {
	// 			header: true,
	// 			skipEmptyLines: true,
	// 			delimiter: ',',
	// 		})
	// 		console.log(parsed)
	// 		// Map parsed data to get titles and artists
	// 		return parsed.data.map(({ title, artist }) => ({ title, artist }))
	// 	}

	// 	// Method to search for a track by title and artist and get its Spotify ID
	// 	const searchTrackId = async (title, artist, accessToken) => {
	// 		const searchQuery = `${title} artist:${artist}`
	// 		const response = await fetch(
	// 			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
	// 				searchQuery
	// 			)}&type=track&limit=1`,
	// 			{
	// 				headers: { 'Authorization': `Bearer ${accessToken}` },
	// 			}
	// 		)
	// 		const data = await response.json()
	// 		return data.tracks.items[0]?.id
	// 	}

	// 	// Method to add tracks to a Spotify playlist
	// 	const addTracksToPlaylist = async (trackIds, accessToken) => {
	// 		console.log("Track Ids: ", trackIds)
	// 		console.log("Token: ", accessToken)
	// 		if (trackIds.length > 0) {
	// 			await fetch(
	// 				`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
	// 				{
	// 					method: 'POST',
	// 					headers: {
	// 						'Authorization': `Bearer ${accessToken}`,
	// 						'Content-Type': 'application/json',
	// 					},
	// 					body: JSON.stringify({
	// 						uris: trackIds.map((id) => `spotify:track:${id}`),
	// 					}),
	// 				}
	// 			)
	// 		}
	// 	}

	// 	// Main async function to orchestrate getting the token, fetching playlist data, and adding tracks
	// 	const init = async () => {
	// 		const accessToken = await getSpotifyToken()
	// 		console.log(accessToken)
	// 		const playlists = [
	// 			'december',
	// 			'january',
	// 			'november',
	// 			'october',
	// 			'september',
	// 		]
	// 		const songObjects = await Promise.all(
	// 			playlists.flatMap((playlist) =>
	// 				fetchAndProcessPlaylist(playlist, accessToken)
	// 			)
	// 		)

	// 		console.log("Song Objects: ", songObjects)

	// 		const trackIds = await Promise.all(
	// 			songObjects.map(({ title, artist }) =>
	// 				searchTrackId(title, artist, accessToken)
	// 			)
	// 		)

	// 		console.log("Track Ids: ", trackIds)

	// 		const filteredTrackIds = trackIds.filter((id) => id) // Remove undefined or null IDs
	// 		await addTracksToPlaylist(filteredTrackIds, accessToken)
	// 	}

	// 	init().catch(console.error)
	// }, [])

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
						<div className='selector-div'>
							<select
								className='selector'
								value={selectedPlaylist}
								onChange={(e) => setSelectedPlaylist(e.target.value)}
							>
								<option value='June'>June 2024 Playlist</option>
								<option value='May'>May 2024 Playlist</option>
								<option value='April'>April 2024 Playlist</option>
								<option value='March'>March 2024 Playlist</option>
								<option value='February'>February 2024 Playlist</option>
								<option value='January'>January 2024 Playlist</option>
								<option value='December'>December 2023 Playlist</option>
								<option value='November'>November 2023 Playlist</option>
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
				<div className='full-playlist-header'>The Full Playlist</div>

				<div className='full-playlist-search'>
					<input
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
											style={{ color: '#e3c087' }}
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
											style={{ color: '#e3c087' }}
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
											style={{ color: '#e3c087' }}
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
											style={{ color: '#e3c087' }}
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
													className='table-body-anchor'
												>
													{item.title}
													<FontAwesomeIcon
														icon={faHeadphones}
														className='headphone-icon'
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
						<div className='search-not-found'>
							Rate didn't play that in this playlist.
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
					<div className='search-not-found'>
						Rate didn't play that in this playlist.
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
