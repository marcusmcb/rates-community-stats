import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'

import './css/navbar.css'

const Navbar = ({
	selectedPlaylist,
	playlistNumber,
	playlistYear,
	playlistLength,
	topUser,
	topUserCount,
}) => {
	const navigate = useNavigate()

	const handleVaultClick = () => {
		navigate('/vault')
	}

	const topUserText = Array.isArray(topUser)
		? (
			<>
				Congrats to{' '}
				{topUser.map((user, index) => (
					<strong key={index} className='highlight-text-color'>
						{user}
					</strong>
				))}{' '}
				for having the most songs played with{' '}
				<strong className='highlight-text-color'>{topUserCount}</strong>{' '}
				songs each.
			</>
		)
		: (
			<>
				Congrats to{' '}
				<strong className='highlight-text-color'>{topUser}</strong>{' '}
				for having the most songs played with{' '}
				<strong className='highlight-text-color'>{topUserCount}</strong>{' '}
				songs.
			</>
		)

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
					{/* Center: Playlist Info */}
					<div className='navbar-center-box'>
						<div className='navbar-playlist-title'>
							Community Spotify Playlist{' '}
							<span className='highlight-text-color'>{playlistNumber}</span> (
							{selectedPlaylist} {playlistYear})
						</div>
						<div className='navbar-playlist-stats'>
							Rate played{' '}
							<strong className='highlight-text-color'>{playlistLength}</strong>{' '}
							songs in this community playlist stream.
						</div>
						<div className='navbar-playlist-congrats'>{topUserText}</div>
					</div>
					{/* Right: Vault Button */}
					<div className='navbar-right-box'>
						<div className='vault-button-component'>
							<button className='vault-button' onClick={handleVaultClick}>
								Search The Vault
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Navbar
