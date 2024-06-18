import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
		<div className='flex justify-center items-center w-full h-full'>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/'>Return Home</Link>
		</div>
	)
}

export default page