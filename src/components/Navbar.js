import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
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
				<div
					className='navbar-left'
				>
					<a
						href='https://twitch.tv/ratewonder'
						rel='noreferrer'
						target='_blank'
						style={{ textDecoration: 'none' }}
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
            padding: '10px'
					}}
				>
					Rate's Community Stats
				</div>
				<div
					className='navbar-right'
				>
					<a
						href='https://open.spotify.com/playlist/7BgAfdN1odTcG4xsYfZtCc'
						rel='no_referrer'
						target='_blank'
						style={{ textDecoration: 'none' }}
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
				Community Spotify Playlist #15
			</div>
			<div
				style={{
					textAlign: 'center',
					fontSize: '18px',
					marginBottom: '15px',
				}}
			>
				Stream Stats (September 2023)
			</div>
		</Fragment>
	)
}

export default Navbar
