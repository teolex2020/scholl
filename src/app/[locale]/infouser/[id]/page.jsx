
import dynamic from 'next/dynamic'
const Infouser = dynamic(() => import('../../../components/infouser/Infouser.jsx'), {
	loading: () => <div className='w-full text-center '></div>,
})
const page = () => {
	 

	return (
		<div				>
			<Infouser/>
		</div>
	)
}

export default page
