import './css/vault.css'
import '../App.css'

const VaultArtistPanel = ({ searchText, data }) => {
	const spotifyPlaylistURLString =
		'https://open.spotify.com/search/RateWonder%20%26%20The%20Twitch%20Fam%20Pt.%20'

	return (
		<div className='report-panel-container'>
			{/* <hr /> */}
			<div className='report-panel-main'>
				Rate has played <span className='search-text-header'>{searchText}</span>{' '}
				a total of <span className='search-times-played'>{data.length}</span>{' '}
				time(s) in his community streams.
			</div>
			<div className='vault-list'>
				<div className='vault-list-header'>
					<span>Song</span>
					<span>Playlist</span>
					<span>Date</span>
					<span>Spotify</span>
				</div>
				{data.map((item, index) => (
					<div className='vault-list-row' key={index}>
						<span className='vault-list-song'>{item.artist} - {item.title}</span>
						<span className='vault-list-playlist'>
							<a
								className='spotify-playlist-link'
								href={spotifyPlaylistURLString + item.playlist_number}
								target='_blank'
								rel='noopener noreferrer'
							>
								Spotify Playlist {item.playlist_number}
							</a>
						</span>
						<span className='vault-list-date'>{item.playlist_date}</span>
						<span className='vault-list-song-link'>
							<a
								className='spotify-song-link'
								href={item.spotify_link}
								target='_blank'
								rel='noopener noreferrer'
							>
								Listen on Spotify
							</a>
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default VaultArtistPanel
