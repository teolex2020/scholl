import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const Infouser = dynamic(
	() => import('../../../components/infouser/Infouser.jsx'),
	{
		loading: () => <Loader />,
	}
)

// import React from 'react'
// import Infouser from '@/app/components/infouser/Infouser.jsx'
const page = () => {
	return (
		<div>
			<Infouser />
		</div>
	)
}

export default page
