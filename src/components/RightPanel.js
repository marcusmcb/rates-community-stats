import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'

import './panels.css'

const RightPanel = ({ data }) => {
	const createSpotifyLink = (artist, title) => {
		const queryString = encodeURIComponent(`${artist} ${title}`)
		return `https://open.spotify.com/search/${queryString}`
	}

	return (
		<div className='right-panel panel'>
			{data.map((entry, idx) => (
				<div key={idx} className='entry'>
					<a
						href={createSpotifyLink(entry.artist, entry.title)}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							fontWeight: '600',
							fontSize: '18px',							
							textDecoration: 'none',
						}}
					>
						{entry.title}
						<FontAwesomeIcon
							icon={faHeadphones}
							style={{ marginLeft: '10px', color: '#e3c087', fontSize: '15px' }}
						/>
					</a>
					<div style={{ fontSize: '16px', color: '#f5cd8d' }}>{entry.artist}</div>
				</div>
			))}
		</div>
	)
}

export default RightPanel
