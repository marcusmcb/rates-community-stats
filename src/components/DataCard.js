import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import createSpotifyLink from './helpers/createSpotifyLink'
import './css/datacard.css'

const DataCard = ({ added, entries }) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetails = () => {
		setShowDetails(!showDetails)
	}	

	return (
		<div className='data-card'>
			<div className='card-header'>
				<strong>{added}</strong>
				{entries.length === 1 ? (
					<span className='songs-text'>({entries.length} song)</span>
				) : (
					<span className='songs-text'>({entries.length} songs)</span>
				)}

				<span className='arrow-icon' onClick={toggleDetails}>
					{showDetails ? '↑' : '↓'}
				</span>
			</div>

			{showDetails &&
				entries.map((entry, idx) => (
					<div key={idx} className='entry'>
						<div className='data-card-song-title'>
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
									className='data-card-headphone-icon'									
								/>
							</a>
						</div>
						<div className='data-card-song-artist'>{entry.artist}</div>
					</div>
				))}
		</div>
	)
}

export default DataCard

// e3c087
