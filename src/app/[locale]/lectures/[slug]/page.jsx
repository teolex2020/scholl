import React from 'react'

// import Meeting from '@/app/components/meeting/Meeting.jsx'
import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const Meeting = dynamic(() => import('../../../components/lectures/Lect'), {
	loading: () => <Loader />,
})


const page = () => {
  return (
    <div className='container mx-auto'><Meeting/></div>
  )
}

export default page