import React from 'react'

const Loader = () => {
	return (
		<div className='fixed top-0 right-0 left-0 bottom-0 flex h-full w-screen justify-center items-center bg-black/90 z-50'>
			<div className='loader'></div>
		</div>
	)
}

export default Loader
