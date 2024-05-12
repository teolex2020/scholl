import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
const ListItem = ({ title }) => {
	
	return (
		<div className='flex gap-5 items-center'>
			<div>
				{' '}
				<CheckIcon className='h-6 w-6 text-green-500' />
			</div>

			<div className='text-start  md:text-lg'>{title}</div>
		</div>
	)
}

export default ListItem
