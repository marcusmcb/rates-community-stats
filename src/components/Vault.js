import React, { Fragment, useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import VaultNavbar from './VaultNavbar'
import VaultAddedByPanel from './VaultAddedByPanel'
import VaultArtistPanel from './VaultArtistPanel'
import VaultTitlePanel from './VaultTitlePanel'
import Footer from './Footer'
import { SEARCH_BY_ARTIST, SEARCH_BY_TITLE, SEARCH_BY_ADDED } from '../api/api'
import '../App.css'
import './css/vault.css'

const Vault = () => {
	const [searchType, setSearchType] = useState('artist')
	const [searchText, setSearchText] = useState('')
	const [finalSearchTerm, setFinalSearchTerm] = useState('')

	const [runQuery, { loading, error, data }] = useLazyQuery(
		searchType === 'artist'
			? SEARCH_BY_ARTIST
			: searchType === 'song'
			? SEARCH_BY_TITLE
			: SEARCH_BY_ADDED
	)

	const handleVaultSearch = (e) => {
		e.preventDefault()
		setFinalSearchTerm(searchText)
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
						<select
							value={searchType}
							onChange={(e) => {
								setSearchText('')
								setSearchType(e.target.value)
							}}
						>
							<option value='artist'>Artist</option>
							<option value='song'>Song/Term</option>
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
						{loading && <p>Loading...</p>}						
						{renderPanel()}
					</div>
				</div>

				<Footer />
			</div>
		</Fragment>
	)
}

export default Vault
