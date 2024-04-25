import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'

const Navbar = ({ selectedPlaylist }) => {
	// const playlistNumber = selectedPlaylist === 'October' ? '#16' : '#15'
	let playlistNumber, playlistYear

	switch (selectedPlaylist) {
		case 'April':
			playlistNumber = '#22'
			playlistYear = '2024'
			break
		case 'March':
			playlistNumber = '#21'
			playlistYear = '2024'
			break
		case 'February':
			playlistNumber = '#20'
			playlistYear = '2024'
			break
		case 'January':
			playlistNumber = '#19'
			playlistYear = '2024'
			break
		case 'December':
			playlistNumber = '#18'
			playlistYear = '2023'
			break
		case 'November':
			playlistNumber = '#17'
			playlistYear = '2023'
			break
		case 'October':
			playlistNumber = '#16'
			playlistYear = '2023'
			break
		case 'September':
			playlistNumber = '#15'
			playlistYear = '2023'
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
				}}
			>
				<div className='navbar-left'>
					<a
						href='https://twitch.tv/ratewonder'
						rel='noreferrer'
						target='_blank'
						style={{ textDecoration: 'none', color: 'rgb(80, 255, 251)' }}
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
						rel='noreferrer'
						target='_blank'
						style={{ textDecoration: 'none', color: 'rgb(80, 255, 251' }}
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
					color: 'lightgray'
				}}
			>
				Playlist Stats ({selectedPlaylist} {playlistYear})
			</div>
		</Fragment>
	)
}

export default Navbar
