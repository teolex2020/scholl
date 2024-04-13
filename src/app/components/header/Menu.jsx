import React from 'react'
import { Gentium_Book_Plus } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const menu = [
	{
		id: 1,
		title: 'course',
		url: '/course',
	},
	{
		id: 5,
		title: 'trainings',
		url: '/trainings',
	},
	{
		id: 2,
		title: 'meeting',
		url: '/meeting',
	},
	// {
	// 	id: 3,
	// 	title: 'brainstorm',
	// 	url: '/brainstorm',
	// },
	{
		id: 4,
		title: 'contact',
		url: '/contact',
	},
]

const Menu = () => {
	const locale = useLocale()
	const pathname = usePathname()
	const t = useTranslations('Menu')

	return (
		<div className='hidden lg:flex flex-1 lg:text-lg xl:ml-14 z-30'>
			<ul
				className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex space-x-5 xl:space-x-16 ${gentium.className} uppercase text-xl bg-blur`}
			>
				{menu.map((item) => (
					<li
						key={item.id}
						className={`${
							pathname.includes(item.url)
								? 'underline underline-offset-[14px]'
								: ''
						} cursor-pointer duration-300 hover:underline underline-offset-[14px]`}
					>
						<Link href={item.url} locale={locale}>
							{t(item.title)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Menu
