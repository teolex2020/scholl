'use server'

import React from 'react'
// import Course from '@/app/components/course/Course'
import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const Course = dynamic(() => import('../../../components/course/Course.jsx'), {
	loading: () => <Loader />,
})

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
