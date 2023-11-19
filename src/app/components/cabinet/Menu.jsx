'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'



const menu = [
	{
		id: 1,
		title: `Мои курсы`,
		url: '/course',
	},

	{
		id: 2,
		title: 'Мои встречи',
		url: '/ ',
	},
	{
		id: 3,
		title: 'Мои мозговые штурмы',
		url: '/ ',
	},

]

const Menu = () => {
	const pathname = usePathname()

	return (
		<div className='hidden lg:flex lg:text-lg  xl:ml-14 z-30'>
			<ul
				className={`  border-zinc-700/50 px-10 py-2 flex space-x-5 xl:space-x-16   uppercase`}
			>
				{menu.map((e) => (
					<Link key={e.id} href={e.url}>
						<li
							className={` ${
								pathname === e.url && ' underline underline-offset-[14px]'
							}  cursor-pointer  duration-300 hover:underline underline-offset-[14px] `}
						>
							{e.title}
						</li>
					</Link>
				))}
			</ul>
		</div>
	)
}

export default Menu
