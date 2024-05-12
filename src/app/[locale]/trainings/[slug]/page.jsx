import React from 'react'

// import Trainings from '@/app/components/Trainings/Trainings'
import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const Trainings = dynamic(
	() => import('../../../components/Trainings/Training'),
	{
		loading: () => <Loader />,
	}
)

const page = () => {
	return (
		<div>
			<Trainings />
		</div>
	)
}

export default page
