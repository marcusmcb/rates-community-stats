import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'

import './css/vaultnavbar.css'
import './css/navbar.css'
import '../App.css'

const VaultNavbar = () => {
	const navigate = useNavigate()
	const handleHomeClick = () => {
		navigate('/')
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
				<div className='navbar-title'>Rate's Recaps</div>
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
			<div className='vault-button-component'>
				<button className='vault-button' onClick={handleHomeClick}>
					Home
				</button>
			</div>
			{/* <div className='navbar-playlist-title'>Spotify Playlist Vault</div> */}
			<div className='navbar-playlist-subtitle'>
				Search all of the songs that Rate has played in his community playlist streams on Twitch by artist, song title, or by Spotify screen name
			</div>
		</Fragment>
	)
}

export default VaultNavbar
