import React, { useState } from 'react'
import './panels.css'

const LeftPanel = ({ data, selectedAdded, onSelect }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const sortedDataEntries = Object.entries(data)
		.sort((a, b) => b[1].length - a[1].length)
		.filter(([added]) => added.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className='left-panel panel'>
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
				}}
			/>
			{sortedDataEntries.length > 0 ? (
				sortedDataEntries.map(([added, entries]) => (
					<div
						key={added}
						className={`added-entry ${
							added === selectedAdded ? 'selected' : ''
						}`}
						onClick={() => onSelect(added)}
					>
						<div className='added-label added-name'>{added}</div>
						{entries.length === 1 ? (
							<div>({entries.length} song)</div>
						) : (
							<div>({entries.length} songs)</div>
						)}
					</div>
				))
			) : (
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					No matches found.
				</div>
			)}
		</div>
	)
}

export default LeftPanel
