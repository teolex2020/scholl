import React from 'react'

import dynamic from 'next/dynamic'
const List = dynamic(() => import('@/app/components/cabinet/List.jsx'), {
	loading: () => <div className='w-full text-center '></div>,
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