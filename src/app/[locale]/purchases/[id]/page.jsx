import React from 'react'
// import Purchases from '@/app/components/Purchases/Purchases'
import Loader from '@/app/components/Loader/Loader'

import dynamic from 'next/dynamic'
const Purchases = dynamic(
	() => import('@/app/components/Purchases/Purchases'),
	{
		loading: () => <Loader />,
	}
)


const page = () => {
	return (
		<div className='flex gap-6 px-12 py-8 '>
			<Purchases />
		</div>
	)
}

export default page
