import React, { Fragment, useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import VaultNavbar from './VaultNavbar'
import VaultAddedByPanel from './VaultAddedByPanel'
import VaultArtistPanel from './VaultArtistPanel'
import VaultTitlePanel from './VaultTitlePanel'
import VaultLeaderboard from './VaultLeaderboard'
import Footer from './Footer'
import {
	SEARCH_BY_ARTIST,
	SEARCH_BY_TITLE,
	SEARCH_BY_ADDED,
	MOST_TRACKS_BY_USER,
} from '../api/api'
import { useQuery } from '@apollo/client'
import '../App.css'
import './css/vault.css'

const Vault = () => {
	const [searchType, setSearchType] = useState('artist')
	const [searchText, setSearchText] = useState('')
	const [finalSearchTerm, setFinalSearchTerm] = useState('')
	const [data, setData] = useState(null)

	// Fetch most tracks by user on page load
	const {
		loading: tracksByViewerLoading,
		error: tracksByViewerError,
		data: tracksByViewerData,
	} = useQuery(MOST_TRACKS_BY_USER)

	const [runQuery, { loading, error }] = useLazyQuery(
		searchType === 'artist'
			? SEARCH_BY_ARTIST
			: searchType === 'song'
			? SEARCH_BY_TITLE
			: SEARCH_BY_ADDED,
		{
			onCompleted: (fetchedData) => {
				setData(fetchedData)
			},
		}
	)

	const handleVaultSearch = (e) => {
		e.preventDefault()
		if (searchText !== '') {
			setFinalSearchTerm(searchText)
			runQuery({
				variables: {
					artist: searchType === 'artist' ? searchText : undefined,
					title: searchType === 'song' ? searchText : undefined,
					added: searchType === 'added' ? searchText : undefined,
				},
			})
		}
	}

	const handleSearchTypeChange = (e) => {
		setSearchType(e.target.value)
		setSearchText('')
		setData(null)
	}

	useEffect(() => {
		if (data) {
			console.log('Query response:', data)
		}
	}, [data])

	const renderPanel = () => {
		if (!data) return null

		switch (searchType) {
			case 'artist':
				return (
					<VaultArtistPanel
						searchText={finalSearchTerm}
						data={data.searchByArtist}
					/>
				)
			case 'song':
				return (
					<VaultTitlePanel
						searchText={finalSearchTerm}
						data={data.searchByTitle}
					/>
				)
			case 'added':
				return (
					<VaultAddedByPanel
						searchText={finalSearchTerm}
						data={data.searchByAdded}
					/>
				)
			default:
				return null
		}
	}

	return (
		<Fragment>
			<div className='main-app'>
				<VaultNavbar />
				<div className='query-form'>
					<form onSubmit={handleVaultSearch}>
						<select value={searchType} onChange={handleSearchTypeChange}>
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
					<div className='report-panel-detail'>
						{/* {loading && <p>Loading...</p>}						 */}
						{renderPanel()}
					</div>
				</div>
				{tracksByViewerData && (
					<VaultLeaderboard/>
				)}

				<Footer />
			</div>
		</Fragment>
	)
}

export default Vault
