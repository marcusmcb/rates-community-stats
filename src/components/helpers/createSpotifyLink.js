const createSpotifyLink = (artist, title) => {
	let queryString = encodeURIComponent(`${artist} ${title}`)
	console.log('queryString: ', queryString)

	if (queryString.includes(encodeURIComponent('(Explicit)'))) {
		console.log(true)
		queryString = queryString.replace(encodeURIComponent('(Explicit)'), '')
	}

	return `https://open.spotify.com/search/${queryString}`
}

export default createSpotifyLink
