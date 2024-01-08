import React from 'react'
import dynamic from 'next/dynamic'
const Trainings = dynamic(
	() => import('@/app/components/Trainings/Trainings.jsx'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
)

const page = () => {
  return (
    <div><Trainings/></div>
  )
}

export default page