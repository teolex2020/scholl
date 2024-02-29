
import dynamic from 'next/dynamic'
const Infouser = dynamic(() => import('../../../components/infouser/Infouser.jsx'), {
	loading: () => <div className='w-full text-center '></div>,
})

// import React from 'react'
// import Infouser from '@/app/components/infouser/Infouser.jsx'
const page = () => {
	 

	return (
		<div				>
			<Infouser/>
		</div>
	)
}

export default page
