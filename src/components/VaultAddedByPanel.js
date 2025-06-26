import './css/vault.css'
import '../App.css'


const VaultAddedByPanel = ({ searchText, data }) => {		

	const spotifyPlaylistURLString =
		'https://open.spotify.com/search/RateWonder%20%26%20The%20Twitch%20Fam%20Pt.%20'

	return (
		<div className='report-panel-container'>
			<hr />
			<div className='report-panel-main'>
				Rate has played <span className='search-text-header'>{searchText}</span>
				's Spotify picks a total of{' '}
				<span className='search-times-played'>{data.length}</span> time(s).
			</div>
			<div className='card-grid'>
				{data.map((item, index) => (
					<div className='card' key={index}>
						<div className='card-title'>
							{item.artist} - {item.title}
						</div>
						<div className='card-playlist-number'>
							<a
								className='spotify-playlist-link'
								href={spotifyPlaylistURLString + item.playlist_number}
								target='_blank'
								rel='noopener noreferrer'
							>
								Spotify Playlist {item.playlist_number}
							</a>
						</div>
						<div className='card-playlist-date'>({item.playlist_date})</div>
						{/* <div className='card-added-by'>
							Added by: <span className='card-added-by-name'>{item.added}</span>
						</div> */}
						<a
							className='spotify-song-link'
							href={item.spotify_link}
							target='_blank'
							rel='noopener noreferrer'
						>
							Listen on Spotify
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default VaultAddedByPanel
