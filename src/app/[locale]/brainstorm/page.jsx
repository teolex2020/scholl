import React from 'react'

import dynamic from 'next/dynamic'
const BrainStorm = dynamic(
	() => import('../../components/brainstorm/BrainStorm.jsx'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
)

const page = () => {
  return (
		<div className='container mx-auto'>
			<BrainStorm />
		</div>
	)
}

export default page