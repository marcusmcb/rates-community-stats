const createSpotifyLink = (artist, title) => {
	let queryString = encodeURIComponent(`${artist} ${title}`)
	if (queryString.includes(encodeURIComponent('(Explicit)'))) {		
		queryString = queryString.replace(encodeURIComponent('(Explicit)'), '')
	}
	return `https://open.spotify.com/search/${queryString}`
}

export default createSpotifyLink
