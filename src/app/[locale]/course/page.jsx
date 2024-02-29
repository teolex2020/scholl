'use server'

import React from 'react'
import Course from '@/app/components/course/Course'

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
