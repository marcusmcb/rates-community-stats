import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'

import './css/navbar.css'

const Navbar = ({ selectedPlaylist }) => {

	const navigate = useNavigate()
	let playlistNumber, playlistYear

	const handleVaultClick = () => {
		navigate('/vault')
	}

	switch (selectedPlaylist) {
		case 'August':
			playlistNumber = '#26'
			playlistYear = '2024'
			break
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
			playlistNumber = '#31'
			playlistYear = '2025'
			break
		case 'December':
			playlistNumber = '#30'
			playlistYear = '2024'
			break
		case 'November':
			playlistNumber = '#29'
			playlistYear = '2024'
			break
		case 'October':
			playlistNumber = '#28'
			playlistYear = '2024'
			break
		case 'September':
			playlistNumber = '#27'
			playlistYear = '2024'
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
			<div className='vault-button-component'>
				<button className='vault-button' onClick={handleVaultClick}>
					The Vault
				</button>
			</div>
		</Fragment>
	)
}

export default Navbar
