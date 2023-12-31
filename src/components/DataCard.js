import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import './datacard.css'

const DataCard = ({ added, entries }) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetails = () => {
		setShowDetails(!showDetails)
	}

	// Function to create Spotify search URL
	const createSpotifyLink = (artist, title) => {
		const queryString = encodeURIComponent(`${artist} ${title}`)
		return `https://open.spotify.com/search/${queryString}`
	}

	return (
		<div className='data-card'>
			<div className='card-header'>
				<strong style={{ color: '#ff5050' }}>{added}</strong>
				{entries.length === 1 ? (
					<span style={{ marginLeft: '10px' }}>({entries.length} song)</span>
				) : (
					<span style={{ marginLeft: '10px' }}>({entries.length} songs)</span>
				)}

				<span className='arrow-icon' style={{ color: 'rgb(81, 206, 78)'}} onClick={toggleDetails}>
					{showDetails ? '↑' : '↓'}
				</span>
			</div>

			{showDetails &&
				entries.map((entry, idx) => (
					<div key={idx} className='entry'>
						<div style={{ fontWeight: '600', fontSize: '16px' }}>
							{/* Updated the title to include a link */}
							<a
								href={createSpotifyLink(entry.artist, entry.title)}
								target='_blank'
								rel='noopener noreferrer'
								style={{ color: 'inherit', textDecoration: 'none' }}
							>
								{entry.title}
								<FontAwesomeIcon
									icon={faHeadphones}
									style={{
										marginLeft: '10px',
										color: '#ff5050',
										fontSize: '13px',
									}}
								/>
							</a>
						</div>
						<div style={{ color: 'rgb(81, 206, 78)' }}>{entry.artist}</div>
					</div>
				))}
		</div>
	)
}

export default DataCard
