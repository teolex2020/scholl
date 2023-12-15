'use server'

import React from 'react'
import dynamic from 'next/dynamic'
const Course = dynamic(
	() => import('../../components/course/Course'),
	{
		loading: () => <div className='w-full text-center '></div>,
	}
	// { suspense: true }
)



const page = () => {


	return (
		<div className='container mx-auto z-10 max-w-[1440px] '>
		

			<div className='w-full text-center'>
				<Course />
			</div>
		</div>
	)
}
export default page
