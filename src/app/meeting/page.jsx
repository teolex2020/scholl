import React from 'react'

import dynamic from 'next/dynamic'
const Meeting = dynamic(() => import('../components/meeting/Meeting.jsx'), {
	loading: () => <div className='w-full text-center '></div>,
})


const page = () => {
  return (
    <div className='container mx-auto'><Meeting/></div>
  )
}

export default page