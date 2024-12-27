import React, { useState } from 'react'
import './css/panels.css'

const LeftPanel = ({
	data,
	selectedAdded,
	onSelect,
	selectedPlaylist,
	onPlaylistChange,
}) => {
	const [searchTerm, setSearchTerm] = useState('')

	// const totalSongs = Object.values(data).reduce(
	// 	(total, entries) => total + entries.length,
	// 	0
	// )

	const sortedDataEntries = Object.entries(data)
		.sort((a, b) => b[1].length - a[1].length)
		.filter(([added]) => added.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className='left-panel panel'>
			<select
				value={selectedPlaylist}
				onChange={(e) => onPlaylistChange(e.target.value)}
				className='left-panel-selector'
			>
				<option value='December'>December 2024 Playlist</option>								
				<option value='November'>November 2024 Playlist</option>
				<option value='October'>October 2024 Playlist</option>
				<option value='September'>September 2024 Playlist</option>
				<option value='August'>August 2024 Playlist</option>
				<option value='July'>July 2024 Playlist</option>
				<option value='June'>June 2024 Playlist</option>
				<option value='May'>May 2024 Playlist</option>
				<option value='April'>April 2024 Playlist</option>
				<option value='March'>March 2024 Playlist</option>
				<option value='February'>February 2024 Playlist</option>
				<option value='January'>January 2024 Playlist</option>				
			</select>
			<input
				type='text'
				placeholder='Search by Spotify screen-name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className='left-panel-selector-input'
			/>
			{sortedDataEntries.length > 0 ? (
				sortedDataEntries.map(([added, entries]) => {
					// const percentage = ((entries.length / totalSongs) * 100).toFixed(2)
					return (
						<div
							key={added}
							className={`added-entry ${
								added === selectedAdded ? 'selected' : ''
							}`}
							onClick={() => onSelect(added)}
						>
							<div className='added-label added-name'>{added}</div>
							<div
								className={`songs-text-main ${
									added === selectedAdded ? 'selected' : ''
								}`}
							>
								{entries.length} song{entries.length !== 1 ? 's' : ''}
								{/* <span> ({percentage}%)</span> */}
							</div>
						</div>
					)
				})
			) : (
				<div className='left-panel-no-matches-found'>No matches found.</div>
			)}
		</div>
	)
}

export default LeftPanel
