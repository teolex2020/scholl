import React from 'react'

const Message = ({ role, content }) => {
	return (
		<div className='mb-5 '>
			<div className={``}>
				{role === 'user' ? (
					<p className='text-green-600'>User</p>
				) : (
					<p className='text-[#ff9000]'> Assistant</p>
				)}
			</div>
			<div
				className={`${
					role === 'user' ? 'bg-[#292e35]' : 'bg-[#5f634c]'
				} p-3 rounded-md`}
			>
				{content}
			</div>
		</div>
	)
}

export default Message
