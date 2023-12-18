import React from 'react'
import dynamic from 'next/dynamic'
const PrivatPolicy = dynamic(
	() => import('../../components/privatpolicy/PrivatPolicy'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
)
const page = () => {
  return <div><PrivatPolicy/></div>
}

export default page