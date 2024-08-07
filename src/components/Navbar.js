import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'

const Navbar = ({ selectedPlaylist }) => {	
	let playlistNumber, playlistYear

	switch (selectedPlaylist) {
		case 'July':
			playlistNumber = '#25'
			playlistYear = '2024'
			break
		case 'June':
			playlistNumber = '#24'
			playlistYear = '2024'
			break
		case 'May':
			playlistNumber = '#23'
			playlistYear = '2024'
			break
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
			<div className='navbar-main'>
				<div className='navbar-left'>
					<a
						href='https://twitch.tv/ratewonder'
						rel='noreferrer'
						target='_blank'
					>
						<FontAwesomeIcon icon={faTwitch} size='2x' />
					</a>
				</div>
				<div className='navbar-title'>Rate's Community Stats</div>
				<div className='navbar-right'>
					<a
						href='https://open.spotify.com/user/djrate'
						rel='noreferrer'
						target='_blank'
					>
						<FontAwesomeIcon icon={faSpotify} size='2x' />
					</a>
				</div>
			</div>
			<div className='navbar-playlist-title'>
				Community Spotify Playlist {playlistNumber}
			</div>
			<div className='navbar-playlist-subtitle'>
				Playlist Stats ({selectedPlaylist} {playlistYear})
			</div>
		</Fragment>
	)
}

export default Navbar
