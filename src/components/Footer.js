import './css/footer.css'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className='main-footer-div'>
			Built by{' '}
			<a href='https://www.mcbportfolio.com' rel='noreferrer' target='_blank'>
				MCB
			</a>
			, {currentYear}
		</div>
	)
}

export default Footer
