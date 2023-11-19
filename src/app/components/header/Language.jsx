"use client"
import React, {useState} from 'react'
import { Gentium_Book_Plus } from 'next/font/google'

const lang = [
	{
		id: 1,
		title: `Uk`,
		},

	{
		id: 2,
		title: 'En',
		},
	{
		id: 3,
		title: 'Ru',
		
	},
	
]

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Language = () => {
  	const [active, setActive] = useState(2)

		const activeclass = (e) => {
			setActive(e)
		}
  return (
		<div className='cursor-pointer text-sm z-20'>
			<ul
				className={` flex items-center space-x-3  ${gentium.className} uppercase`}
			>
				{lang.map((e) => (
					<li
						key={e.id}
						className={`${
							active === e.id && ' text-xl'
						} cursor-pointer  duration-300  `}
						onClick={() => activeclass(e.id)}
					>
						{e.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Language