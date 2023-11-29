"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { MobileMenus } from '@/store/features/counterSlice'


const menu = [
	{
		id: 1,
		title: `Курсы`,
		url: '/course',
	},

	{
		id: 2,
		title: 'Встречи',
		url: '/meeting',
	},
	{
		id: 3,
		title: 'Мозговые штурмы',
		url: '/brainstorm',
	},
	{
		id: 4,
		title: 'контакты',
		url: '/contact',
	},
]

const MobileMenu = () => {
  	const mobilemenu = useSelector((state) => state.counter.mobilemenu)
  	const pathname = usePathname()
    const dispatch=useDispatch()
  return (
		<div className='absolute bg-menublur mt-16 w-screen h-screen top-0 -right-30 z-50 md:hidden '>
			<div className=' items-center   gap-10 text-xl mt-[10%] '>
				<ul
					className={`  px-10 py-2 flex flex-col  text-center gap-8  uppercase`}
				>
					{menu.map((item) => (
						<Link
							key={item.id}
							href={item.url}
							onClick={() => dispatch(MobileMenus(mobilemenu))}
						>
							<li
								className={`${
									pathname === item.url
										? 'underline underline-offset-[14px]'
										: ''
								} cursor-pointer  duration-300 hover:underline underline-offset-[14px]`}
							>
								{item.title}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	)
}

export default MobileMenu