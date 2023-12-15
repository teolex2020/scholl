import React from 'react'
import dynamic from 'next/dynamic'
const ContactComponent = dynamic(
	() => import('../../components/contact/Contact.jsx'),
	{
		loading: () => <div className='w-full text-center '></div>,
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
