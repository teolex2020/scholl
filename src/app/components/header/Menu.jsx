'use client'
import React from 'react'
import { Gentium_Book_Plus } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const menu = [
	{
		id: 1,
		title: `Курсы`,
		url: '/course',
	},

	{
		id: 2,
		title: 'Встречи',
		url: '/ ',
	},
	{
		id: 3,
		title: 'Мозговые штурмы',
		url: '/ ',
	},
	{
		id: 4,
		title: 'контакты',
		url: '/ ',
	},
]

const Menu = () => {

	  const pathname = usePathname()




	return (
		<div className='hidden lg:flex flex-1 lg:text-lg  xl:ml-14 z-30'>
			<ul
				className={` border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex space-x-5 xl:space-x-16  ${gentium.className} uppercase`}
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
