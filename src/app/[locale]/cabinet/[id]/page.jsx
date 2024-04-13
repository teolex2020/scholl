import React from 'react'
import Loader from '@/app/components/Loader/Loader'

import dynamic from 'next/dynamic'
const List = dynamic(() => import('@/app/components/cabinet/List.jsx'), {
	loading: () => <Loader />,
})



 const page = () => {
  return (
		<div className='   z-30 flex flex-col justify-between  relative h-full'>
	
						<div className=' h-full'>
				<List />
			</div>
			<div></div>
		</div>
	)
}

export default page