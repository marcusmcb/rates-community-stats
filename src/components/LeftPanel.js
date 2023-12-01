import React, { useState } from 'react'
import './panels.css'

const LeftPanel = ({
	data,
	selectedAdded,
	onSelect,
	selectedPlaylist,
	onPlaylistChange,
}) => {
	const [searchTerm, setSearchTerm] = useState('')

	const totalSongs = Object.values(data).reduce(
		(total, entries) => total + entries.length,
		0
	)

	const sortedDataEntries = Object.entries(data)
		.sort((a, b) => b[1].length - a[1].length)
		.filter(([added]) => added.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className='left-panel panel'>
			<select
				value={selectedPlaylist}
				onChange={(e) => onPlaylistChange(e.target.value)}
				style={{
					width: '100%',
					padding: '5px',
					margin: '5px 0 15px 0',
					boxSizing: 'border-box',
					fontFamily: 'Fira Sans'
				}}
			>
				<option value='November'>November 2023 Playlist</option>
				<option value='October'>October 2023 Playlist</option>
				<option value='September'>September 2023 Playlist</option>
			</select>
			<input
				type='text'
				placeholder='Search by Spotify screen-name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{
					width: '100%',
					padding: '5px',
					margin: '5px 0 15px 0',
					boxSizing: 'border-box',
					fontFamily: 'Fira Sans'
				}}
			/>
			{sortedDataEntries.length > 0 ? (
				sortedDataEntries.map(([added, entries]) => {
					const percentage = ((entries.length / totalSongs) * 100).toFixed(2)
					return (
						<div
							key={added}
							className={`added-entry ${
								added === selectedAdded ? 'selected' : ''
							}`}
							onClick={() => onSelect(added)}
						>
							<div className='added-label added-name'>{added}</div>
							<div>
								{entries.length} song{entries.length !== 1 ? 's' : ''}
								{/* <span> ({percentage}%)</span> */}
							</div>
						</div>
					)
				})
			) : (
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					No matches found.
				</div>
			)}
		</div>
	)
}

export default LeftPanel
