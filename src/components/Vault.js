import React, { Fragment, useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import VaultNavbar from './VaultNavbar'
import Footer from './Footer'
import { SEARCH_BY_ARTIST, SEARCH_BY_TITLE, SEARCH_BY_ADDED } from '../api/api'
import '../App.css'
import './css/vault.css'

const Vault = () => {
	const [searchType, setSearchType] = useState('artist')
	const [searchText, setSearchText] = useState('')
  
	// useLazyQuery allows us to run the query only when we explicitly call it
	const [runQuery, { loading, error, data }] = useLazyQuery(
		searchType === 'artist'
			? SEARCH_BY_ARTIST
			: searchType === 'song'
			? SEARCH_BY_TITLE
			: SEARCH_BY_ADDED
	)

	const handleVaultSearch = (e) => {
		e.preventDefault()

		// Run the query only if searchText is not empty
		if (searchText !== '') {
			runQuery({
				variables: {
					artist: searchType === 'artist' ? searchText : undefined,
					title: searchType === 'song' ? searchText : undefined,
					added: searchType === 'added' ? searchText : undefined,
				},
			})
		}
	}

	// Log the query results when data changes
	useEffect(() => {
		if (data) {
			console.log('Query response:', data)
		}
	}, [data])

	return (
		<Fragment>
			<div className='main-app'>
				<VaultNavbar />
				<div className='query-form'>
					<form onSubmit={handleVaultSearch}>
						<select
							value={searchType}
							onChange={(e) => {
                setSearchText('')
                setSearchType(e.target.value)
              }}
						>
							<option value='artist'>Artist</option>
							<option value='song'>Song</option>
							<option value='added'>Added By</option>
						</select>
						<input
							type='text'
							placeholder='Enter your search here...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<button type='submit'>Search</button>
					</form>
				</div>

				<div className='search-results'>
					{/* {loading && <p>Loading...</p>} */}
					{/* {error && <p>Error: {error.message}</p>} */}
					{data && (
						<ul>
							{data[Object.keys(data)[0]].map((item, index) => (
								<li key={index}>
									<p>
										<strong>{item.artist}</strong> - {item.title}
									</p>
									<p>Playlist Date: {item.playlist_date}</p>
									<a
										href={item.spotify_link}
										target='_blank'
										rel='noopener noreferrer'
									>
										Listen on Spotify
									</a>
								</li>
							))}
						</ul>
					)}
				</div>

				<Footer />
			</div>
		</Fragment>
	)
}

export default Vault
