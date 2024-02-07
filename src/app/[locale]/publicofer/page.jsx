import React from 'react'
import dynamic from 'next/dynamic'
const Publicofer = dynamic(
	() => import('../../components/Publicofer/Publicofer'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
)

const page = () => {
  return (
		<div><Publicofer/></div>
	)
}

export default page