const SongCard = ({ title, artist, added, index }) => (
	<div
		style={{
			margin: '0 5%',
			marginBottom: '10px',
			padding: '10px',
			border: '1px solid #ccc',
			borderRadius: '5px',
		}}
	>
		<div style={{ fontSize: '18px', color: 'khaki' }}>
			<strong>
				{index + 1}. {title}
			</strong>
		</div>
		<div style={{ fontSize: '16px', marginTop: '2px' }}>{artist}</div>
		<div style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '5px' }}>
			added by{' '}
			<span style={{ fontStyle: 'italic', fontWeight: '600' }}>{added}</span>
		</div>
	</div>
)

export default SongCard
