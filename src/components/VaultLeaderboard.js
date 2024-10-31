import { useEffect, useState } from 'react'
import {
	MOST_TRACKS_BY_USER,
	MOST_PLAYED_ARTISTS,
	MOST_PLAYED_TITLES,
} from '../api/api'
import { useQuery } from '@apollo/client'
import './css/leaderboard.css'

const VaultLeaderBoard = () => {
	const [hasLoaded, setHasLoaded] = useState(false)

	// Initial query executions on first load
	const { data: tracksByViewerData, loading: loadingViewerData } =
		useQuery(MOST_TRACKS_BY_USER)
	const { data: mostPlayedArtistsData, loading: loadingArtistsData } =
		useQuery(MOST_PLAYED_ARTISTS)
	const { data: mostPlayedTitlesData, loading: loadingTitlesData } =
		useQuery(MOST_PLAYED_TITLES)

	// Store the loaded data once fetched
	const [viewerData, setViewerData] = useState(null)
	const [artistData, setArtistData] = useState(null)
	const [titleData, setTitleData] = useState(null)

	// Save the data to state only on the first load
	useEffect(() => {
		if (
			!hasLoaded &&
			!loadingViewerData &&
			!loadingArtistsData &&
			!loadingTitlesData
		) {
			setViewerData(tracksByViewerData)
			setArtistData(mostPlayedArtistsData)
			setTitleData(mostPlayedTitlesData)
			setHasLoaded(true)
		}
	}, [
		hasLoaded,
		loadingViewerData,
		loadingArtistsData,
		loadingTitlesData,
		tracksByViewerData,
		mostPlayedArtistsData,
		mostPlayedTitlesData,
	])

	return (
		<div className='leaderboard-main'>			
			<div className='leaderboard-top-picks'>
				{viewerData && (					
					<div>
						<h2>Most Spotify Adds Played</h2>
						<table className='leaderboard-table'>
							<tbody>
								{viewerData.mostTracksByUser.map((user, index) => (
									<tr key={index}>
										<td className='leaderboard-user'>{user.added}</td>
										<td className='leaderboard-track-count'>
											{user.trackCount}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className='leaderboard-top-artists'>
				{artistData && (
					<div>
						<h2>Most Played Artists</h2>
						<table className='leaderboard-table'>
							<tbody>
								{artistData.mostPlayedArtists.map((artist, index) => (
									<tr key={index}>
										<td className='leaderboard-user'>{artist.artist}</td>
										<td className='leaderboard-track-count'>
											{artist.trackCount}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className='leaderboard-top-songs'>
				{titleData && (
					<div>
						<h2>Most Played Songs</h2>
						<table className='leaderboard-table'>
							<tbody>
								{titleData.mostPlayedTitles.map((title, index) => (
									<tr key={index}>
										<td className='leaderboard-user'>
											<div className='song-title'>"{title.title}"</div>
											<div className='song-artist'>{title.artist}</div>
										</td>
										<td className='leaderboard-track-count'>
											{title.playCount} plays
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default VaultLeaderBoard
