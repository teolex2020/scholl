'use client'
import React from 'react'
import { Link } from '@/navigation'
const ButtonStartPage = ({ button }) => {
	return (
		<div>
			{' '}
			<Link href='/course'>
				<button className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-2xl px-10 w-full'>
					<p className=' text-xl uppercase'>{button}</p>
				</button>
			</Link>
		</div>
	)
}

export default ButtonStartPage