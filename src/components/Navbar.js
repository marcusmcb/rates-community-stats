import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'

const Navbar = ({ selectedPlaylist }) => {
	// const playlistNumber = selectedPlaylist === 'October' ? '#16' : '#15'
	let playlistNumber

	switch (selectedPlaylist) {
		case 'December':
			playlistNumber = '#18'
			break
		case 'November':
			playlistNumber = '#17'
			break
		case 'October':
			playlistNumber = '#16'
			break
		case 'September':
			playlistNumber = '#15'
			break
		default:
			playlistNumber = 'Unknown'
			break
	}
	return (
		<Fragment>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '15px',
				}}
			>
				<div className='navbar-left'>
					<a
						href='https://twitch.tv/ratewonder'
						rel='noreferrer'
						target='_blank'
						style={{ textDecoration: 'none', color: 'rgb(81, 206, 78)' }}
					>
						<FontAwesomeIcon icon={faTwitch} size='2x' />
					</a>
				</div>
				<div
					style={{
						flex: 3,
						textAlign: 'center',
						fontSize: '30px',
						fontWeight: '600',
						padding: '10px',
					}}
				>
					Rate's Community Stats
				</div>
				<div className='navbar-right'>
					<a
						href='https://open.spotify.com/user/djrate'
						rel='no_referrer'
						target='_blank'
						style={{ textDecoration: 'none', color: '#ff5050' }}
					>
						<FontAwesomeIcon icon={faSpotify} size='2x' />
					</a>
				</div>
			</div>
			<div
				style={{
					textAlign: 'center',
					fontSize: '18px',
					marginBottom: '5px',
				}}
			>
				Community Spotify Playlist {playlistNumber}
			</div>
			<div
				style={{
					textAlign: 'center',
					fontSize: '18px',
					marginBottom: '15px',
				}}
			>
				Playlist Stats ({selectedPlaylist} 2023)
			</div>
		</Fragment>
	)
}

export default Navbar
