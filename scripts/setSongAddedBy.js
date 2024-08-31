const fs = require('fs')
const Papa = require('papaparse')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

let fullTrackArray = []

const playlistId = '6eNOtHVgHfTzhv31I0qEsd'
const playlistName = 'august'

const getAccessToken = async () => {
	try {
		const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			null,
			{
				params: {
					grant_type: 'refresh_token',
					refresh_token: refreshToken,
					client_id: clientId,
					client_secret: clientSecret,
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		)
		return response.data.access_token
	} catch (error) {
		console.error('Error refreshing access token:', error.response.data)
	}
}

const fetchSeratoData = async (playlist) => {
	try {
		const filePath = `./data/rate_wonder_spotify_stream_${playlist.toLowerCase()}.csv`
		const fileContent = fs.readFileSync(filePath, 'utf8')
		const parsed = Papa.parse(fileContent, {
			header: true,
			skipEmptyLines: true,
			delimiter: ',',
		})
		return parsed.data.map(({ name, artist }) => ({ name, artist }))
	} catch (error) {
		console.error('Error reading or parsing the file:', error)
	}
}

const getAllPlaylistTracks = async (accessToken, playlistId) => {
	let tracks = []
	let next = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`

	while (next) {
		const response = await axios.get(next, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		tracks = tracks.concat(response.data.items)
		next = response.data.next
	}
	return tracks
}

const getSpotifyUserName = async (accessToken, userId) => {
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/users/${userId}`,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		)
		return response.data.display_name
	} catch (error) {
		console.error('Error fetching user:', error)
		return 'user name unavailable'
	}
}

const normalizeTitle = (title) => {
	// Convert to lowercase for case-insensitive comparison
	// Trim leading and trailing spaces
	// Replace multiple spaces with a single space
	title = title.toLowerCase().trim().replace(/\s+/g, ' ')

	// Find the first occurrence of non-alphanumeric characters or punctuation (e.g., (, -, —)
	const cutoffIndex = title.search(/[\(\-\–\.'\.]/);

	// If such characters are found, truncate the title up to that point
	if (cutoffIndex !== -1) {
		title = title.substring(0, cutoffIndex).trim()
	}

	return title
}

const findUnmatchedSeratoTracks = (seratoData, fullTrackArray) => {
	// Create a Set of normalized titles from fullTrackArray
	const fullTrackTitles = new Set(
		fullTrackArray.map((track) => normalizeTitle(track.title))
	)

	// Filter seratoData to find tracks not in fullTrackTitles
	const unmatchedSeratoTracks = seratoData.filter(
		(seratoTrack) => !fullTrackTitles.has(normalizeTitle(seratoTrack.name))
	)

	return unmatchedSeratoTracks
}

const setSongAddedBy = async (playlistId) => {
	console.log('Playlist ID: ', playlistId)

	const token = await getAccessToken()
	const tracks = await getAllPlaylistTracks(token, playlistId)
	for (const track of tracks) {
		const artistNames = track.track.artists.map((artist) =>
			artist.name !== null ? artist.name : null
		)
		const addedBy = await getSpotifyUserName(token, track.added_by.id)
		const trackEntry = {
			title: track.track.name,
			artist: artistNames.join(', '),
			added: addedBy,
			spotify_url: track.track.external_urls.spotify,
		}
		console.log('Track Entry: ', trackEntry)
		console.log('------------------------------')
		fullTrackArray.push(trackEntry)
	}

	const seratoData = await fetchSeratoData(playlistName)
	console.log('Serato Data: ', seratoData)
	console.log('------------------------------')

	// Compare and filter tracks
	const filteredTracks = fullTrackArray.filter((track) =>
		seratoData.some(
			(seratoTrack) =>
				normalizeTitle(seratoTrack.name) === normalizeTitle(track.title)
		)
	)

	const unmatchedSeratoTracks = findUnmatchedSeratoTracks(
		seratoData,
		fullTrackArray
	)

	console.log('Unmatched Serato Tracks:', unmatchedSeratoTracks)
	console.log('Unmatched Serato Tracks:', unmatchedSeratoTracks.length)
	// console.log('Filtered Tracks:', filteredTracks)
	console.log('------------------------------')
	console.log('Total Filtered Tracks:', filteredTracks.length)
	console.log('------------------------------')
}

setSongAddedBy(playlistId)
