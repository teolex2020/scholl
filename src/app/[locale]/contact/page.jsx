import React from 'react'
import Loader from '@/app/components/Loader/Loader.jsx'
import dynamic from 'next/dynamic'
const ContactComponent = dynamic(
	() => import('../../components/contact/Contact.jsx'),
	{
		loading: () => <Loader />,
	}
)

const Contact = () => {
	return (
		<div>
			<ContactComponent />
		</div>
	)
}

export default Contact
