import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'

const SongCard = ({ title, artist, added, index }) => {
	const createSpotifyLink = (artist, title) => {
		const queryString = encodeURIComponent(`${artist} ${title}`)
		return `https://open.spotify.com/search/${queryString}`
	}

	return (
		<div
			style={{
				margin: '0 5%',
				marginBottom: '10px',
				padding: '10px',
				border: '1px solid #ccc',
				borderRadius: '5px',
			}}
		>
			<div style={{ fontSize: '18px', color: 'khaki' }}>
				<strong>
					{index + 1}.
					<a
						href={createSpotifyLink(artist, title)}
						target='_blank'
						rel='noopener noreferrer'
						style={{ color: 'khaki', textDecoration: 'none' }}
					>
						{title}
						<FontAwesomeIcon
							icon={faHeadphones}
							style={{ marginLeft: '10px', color: 'white', fontSize: '15px' }}
						/>
					</a>
				</strong>
			</div>
			<div style={{ fontSize: '16px', marginTop: '2px' }}>{artist}</div>
			<div style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '5px' }}>
				added by{' '}
				<span
					style={{ fontStyle: 'italic', fontWeight: '600', color: 'bisque' }}
				>
					{added}
				</span>
			</div>
		</div>
	)
}

export default SongCard
