import React, { Fragment, useState, useEffect } from 'react'
import Papa from 'papaparse'
import '../../fonts/BillboardFont.css'

const BillboardChart = () => {
	const [data, setData] = useState([])
	const [processedData, setProcessedData] = useState({})
	const [selectedAdded, setSelectedAdded] = useState(null)

	useEffect(() => {
		const fetchData = () => {
			fetch('/data/rate_wonder_spotify_stream_october.csv')
				.then((response) => response.text())
				.then((data) => {
					const parsedData = Papa.parse(data, {
						header: true,
						skipEmptyLines: true,
						delimiter: ',',
					})
					console.log(parsedData)
					const dataByAdded = processData(parsedData.data)
					setProcessedData(dataByAdded)
					setData(
						parsedData.data.map((item, index) => ({
							...item,
							originalOrder: index,
						}))
					)
					const topAdded = Object.keys(dataByAdded).sort(
						(a, b) => dataByAdded[b].length - dataByAdded[a].length
					)[0]
					setSelectedAdded(topAdded)
				})
		}
		fetchData()
	}, [])

	const processData = (parsedData) => {
		return parsedData.reduce((acc, curr) => {
			const { title, artist, added } = curr
			if (!acc[added]) {
				acc[added] = []
			}
			acc[added].push({ title, artist })
			return acc
		}, {})
	}

	setTimeout(() => {
		console.log(processedData)
	}, 2000)

	return (
		<Fragment>
			<div className='header-row'>
				<div>
					<div className='billboard-header'>RateWonder's</div>
					<div className='billboard-header-label'>FOR NOVEMBER, 2023</div>
				</div>
				<div className='spotify-title'>TOP SPOTIFY PICKS</div>
        <div className='spotify-blurb'>COMPILED FROM NOVEMBER'S COMMUNITY SPOTIFY PLAYLIST STREAM</div>
			</div>
			{/* <hr /> */}
      <br/>
			<div className='chart-body'>
				{Object.entries(processedData)
					.sort((a, b) => b[1].length - a[1].length) // Sorting the entries
					.map(([entryName, songs]) => (
						<div className='chart-row' key={entryName}>
							<span className='entry-name'>{entryName}</span>
							<span className='entry-length'>{songs.length} songs</span>
						</div>
					))}
			</div>
		</Fragment>
	)
}

export default BillboardChart
