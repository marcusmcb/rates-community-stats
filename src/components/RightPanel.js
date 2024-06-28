import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import createSpotifyLink from './helpers/createSpotifyLink'

import './css/panels.css'

const RightPanel = ({ data }) => {
	return (
		<div className='right-panel panel'>
			{data.map((entry, idx) => (
				<div key={idx} className='entry'>
					<a
						href={createSpotifyLink(entry.artist, entry.title)}
						target='_blank'
						rel='noopener noreferrer'
						className='spotify-anchor'
					>
						{entry.title}
						<FontAwesomeIcon
							icon={faHeadphones}
							className='spotify-anchor-icon'
						/>
					</a>
					<div className='spotify-artist'>{entry.artist}</div>
				</div>
			))}
		</div>
	)
}

export default RightPanel
