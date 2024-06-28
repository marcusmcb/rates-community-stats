import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import createSpotifyLink from './helpers/createSpotifyLink'
import './css/songcard.css'

const SongCard = ({ title, artist, added, index }) => {
	return (
		<div className='songcard-main'>
			<div className='songcard-index'>
				<strong className='songcard-index-strong'>
					{index + 1}.
					<a
						href={createSpotifyLink(artist, title)}
						target='_blank'
						rel='noopener noreferrer'
						className='songcard-spotify-anchor'
					>
						{title}
						<FontAwesomeIcon
							icon={faHeadphones}
							className='songcard-spotify-icon'
						/>
					</a>
				</strong>
			</div>
			<div className='songcard-spotify-artist'>{artist}</div>
			<div className='songcard-spotify-added-by'>
				added by <span className='songcard-spotify-added-by-span'>{added}</span>
			</div>
		</div>
	)
}

export default SongCard
