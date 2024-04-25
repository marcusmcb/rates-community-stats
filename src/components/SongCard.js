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
			<div style={{ fontSize: '18px' }}>
				<strong
					style={{ color: '#f5cd8d'}}
				>
					{index + 1}.
					<a
						href={createSpotifyLink(artist, title)}
						target='_blank'
						rel='noopener noreferrer'
						style={{ textDecoration: 'none', marginLeft: '5px' }}
					>
						{title}
						<FontAwesomeIcon
							icon={faHeadphones}
							style={{ marginLeft: '10px', color: '#e3c087', fontSize: '15px' }}
						/>
					</a>
				</strong>
			</div>
			<div style={{ fontSize: '16px', marginTop: '2px', color: '#f5cd8d' }}>{artist}</div>
			<div style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '5px' }}>
				added by{' '}
				<span
					style={{ fontStyle: 'italic', fontWeight: '600', color: '#e3c087' }}
				>
					{added}
				</span>
			</div>
		</div>
	)
}

export default SongCard
