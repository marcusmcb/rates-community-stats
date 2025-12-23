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
	theme,
	onToggleTheme,
	skin,
	onSkinChange,
}) => {
	const navigate = useNavigate()

	const handleVaultClick = () => {
		navigate('/vault')
	}

	const renderTopUsers = () => {
		if (!Array.isArray(topUser)) {
			return <strong className='highlight-text-color'>{topUser}</strong>
		}

		return topUser.map((user, index) => {
			const isSecondLast = index === topUser.length - 2
			const isLast = index === topUser.length - 1
			const separator = isLast
				? ''
				: topUser.length === 2
					? ' and '
					: isSecondLast
						? ' and '
						: ', '

			return (
				<Fragment key={`${user}-${index}`}>
					<strong className='highlight-text-color'>{user}</strong>
					{separator}
				</Fragment>
			)
		})
	}

	const topUserText = Array.isArray(topUser) ? (
		<>
			Congrats to {renderTopUsers()} for having the most songs played with{' '}
			<strong className='highlight-text-color'>{topUserCount}</strong> songs each.
		</>
	) : (
		<>
			Congrats to {renderTopUsers()} for having the most songs played with{' '}
			<strong className='highlight-text-color'>{topUserCount}</strong> songs.
		</>
	)

	return (
		<Fragment>
			<div className='navbar-container'>
				<div className='navbar-main-flex'>
					<div className='navbar-left-box'>
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
					<div className='navbar-right-box'>
						<div className='navbar-controls'>
							<button
								className='navbar-control-button'
								onClick={onToggleTheme}
								aria-label='Toggle light/dark mode'
								type='button'
							>
								{theme === 'dark' ? 'Light mode' : 'Dark mode'}
							</button>
							<select
								className='navbar-control-select'
								value={skin}
								onChange={(e) => onSkinChange?.(e.target.value)}
								aria-label='Select color skin'
							>
								<option value='gold'>Gold</option>
								<option value='teal'>Teal</option>
								<option value='purple'>Purple</option>
								<option value='christmas'>Christmas</option>
								<option value='light-green'>Light Green</option>
								<option value='pink'>Pink</option>
							</select>
							<div className='vault-button-component'>
								<button className='vault-button' onClick={handleVaultClick}>
									Search The Vault
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Navbar
