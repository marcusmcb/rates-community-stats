import { MOST_TRACKS_BY_USER } from '../api/api'
import { useQuery } from '@apollo/client'
import './css/leaderboard.css'

const VaultLeaderBoard = () => {
	// Fetch most tracks by user on page load
	const {
		loading: tracksByViewerLoading,
		error: tracksByViewerError,
		data: tracksByViewerData,
	} = useQuery(MOST_TRACKS_BY_USER)

	return (
		<div className='leaderboard-main'>
			<div className='leaderboard-top-picks'>
				{tracksByViewerData && (
					<div>
						<h2>Most Spotify Adds Played</h2>
						<table className='leaderboard-table'>
							<tbody>
								{tracksByViewerData.mostTracksByUser
									.slice(0, 10)
									.map((user, index) => (
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
			<div className='leaderboard-top-artists'>2nd Div</div>
			<div className='leaderboard-top-songs'>3rd Div</div>
		</div>
	)
}

export default VaultLeaderBoard
