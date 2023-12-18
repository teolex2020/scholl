import React from 'react'
import dynamic from 'next/dynamic'
const TeamofServiset = dynamic(
	() => import('../../components/teamofservise/TeamofServise'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
)

const page = () => {
  return <div><TeamofServiset/></div>
}

export default page