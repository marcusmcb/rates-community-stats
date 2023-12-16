const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div style={{ textAlign: 'center', fontSize: '12px', padding: '15px' }}>
			Built by{' '}
			<a
				href='https://www.mcbportfolio.com'
				rel='noreferrer'
				target='_blank'
				style={{ textDecoration: 'none' }}
			>
				MCB
			</a>
			, {currentYear}
		</div>
	)
}

export default Footer
