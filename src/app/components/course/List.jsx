import React from 'react'

const List = ({ title }) => {

	return (
		<div className='flex gap-5 items-center'>
			

			<div className='text-start  md:text-lg p-2'>- {title}</div>
		</div>
	)
}

export default List
