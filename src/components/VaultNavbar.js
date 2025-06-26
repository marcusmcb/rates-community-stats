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
			<div className='navbar-container'>
				<div className='navbar-main-flex'>
					{/* Left: Icons and Title */}
					<div className='navbar-left-box'>
						{/* Stacked layout for desktop */}
						<div className='navbar-left-stack'>
							<div className='navbar-icon-col'>
								<a
									href='https://twitch.tv/ratewonder'
									rel='noreferrer'
									target='_blank'
									className='navbar-icon-link'
								>
									<FontAwesomeIcon icon={faTwitch} size='2x' />
								</a>
								<a
									href='https://open.spotify.com/user/djrate'
									rel='noreferrer'
									target='_blank'
									className='navbar-icon-link'
								>
									<FontAwesomeIcon icon={faSpotify} size='2x' />
								</a>
							</div>
							<div className='navbar-title-stack'>
								<span className='navbar-title-large'>Rate's</span>
								<span className='navbar-title-large'>Recaps</span>
							</div>
						</div>
						{/* Inline layout for mobile */}
						<div className='navbar-left-inline'>
							<a
								href='https://twitch.tv/ratewonder'
								rel='noreferrer'
								target='_blank'
								className='navbar-icon-link'
							>
								<FontAwesomeIcon icon={faTwitch} size='2x' />
							</a>
							<span className='navbar-title-inline'>Rate's Recaps</span>
							<a
								href='https://open.spotify.com/user/djrate'
								rel='noreferrer'
								target='_blank'
								className='navbar-icon-link'
							>
								<FontAwesomeIcon icon={faSpotify} size='2x' />
							</a>
						</div>
					</div>
					{/* Center: Main Text */}
					<div className='navbar-center-box'>
						<div className='vault-navbar-playlist-title'>
							Search all of the songs that Rate has played in his community
							playlist streams on Twitch, either by artist, title, or by Spotify
							screen name.
						</div>
					</div>
					{/* Right: Home Button */}
					<div className='navbar-right-box'>
						<div className='vault-button-component'>
							<button className='vault-button' onClick={handleHomeClick}>
								Home
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default VaultNavbar
