'use client'
import React, { useState } from 'react'
import { Gentium_Book_Plus } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const menu = [
	{ id: 1, title: 'course', url: '/course' },
	{ id: 5, title: 'trainings', url: '/trainings' },
	{ id: 3, title: 'lecture', url: '/lectures' },
	{ id: 2, title: 'meeting', url: '/meeting' },
	{ id: 4, title: 'contact', url: '/contact' },
]

const MobileDropdownMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations('Menu')

	const toggleMenu = () => setIsOpen(!isOpen)

	return (
		<div className=' relative hidden lg:flex flex-1 lg:text-lg xl:ml-10 z-30'>
			<button
				onClick={toggleMenu}
				className='p-2 border-2 border-zinc-700 rounded-md bg-blur flex items-center gap-2  uppercase text-white font-semibold'
			>
				{/* Гамбургер-іконка */}
				<svg
					className='w-7 h-7 text-white'
					fill='none'
					stroke='currentColor'
					strokeWidth={2}
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M4 6h16M4 12h16M4 18h16'
					/>
				</svg>
				<span className='text-base'>Explore</span>
			</button>

			{/* Меню */}
			{isOpen && (
				<div
					className='fixed inset-0 flex items-start justify-end bg-transparent '
					onClick={toggleMenu}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={`absolute left-0  mt-20 w-48 bg-blur border border-zinc-700 rounded-xl shadow-xl p-4 ml-[17%] ${gentium.className}`}
					>
						<ul className='flex flex-col gap-3 text-lg uppercase text-[#e2a550]'>
							{menu.map((item) => (
								<li key={item.id}>
									<Link
										href={item.url}
										locale={locale}
										onClick={() => setIsOpen(false)}
										className={`block hover:underline ${
											pathname.includes(item.url) ? 'underline text-gold' : ''
										}`}
									>
										{t(item.title)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default MobileDropdownMenu
