import React from 'react'
import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const Course = dynamic(() => import('../../components/course/Allcourse.jsx'), {
	loading: () => <Loader />,
})

const Allcourse = () => {
  return <div className='container mx-auto flex '><Course/></div>
}

export default Allcourse