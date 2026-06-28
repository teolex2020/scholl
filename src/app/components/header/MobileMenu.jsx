'use client'
import React from 'react'
import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { MobileMenus, Authuser } from '@/store/features/counterSlice'

import { getAuth, signOut } from 'firebase/auth'

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
		id: 3,
		title: 'lecture',
		url: '/lectures',
	},
	{
		id: 2,
		title: 'meeting',
		url: '/meeting',
	},

	{
		id: 4,
		title: 'contact',
		url: '/contact',
	},
]

const MobileMenu = () => {
	const { mobilemenu, authUser, id } = useSelector((state) => state.counter)

	

	const dispatch = useDispatch()
	const locale = useLocale()
	const t = useTranslations('Menu')
	const b = useTranslations('Popup')

	const singout = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				dispatch(MobileMenus(mobilemenu))
				dispatch(Authuser(false))
			})

			.catch((error) => {
				console.log(error)
			})
	}

	const itemClass =
		'w-full h-12 flex justify-center items-center rounded-xl border border-white/10 bg-white/5 hover:border-[#e2a550]/50 hover:bg-white/10 cursor-pointer transition-all duration-300 text-slate-200'

	return (
		<div className='fixed inset-0 w-screen h-screen z-50 md:hidden bg-[#0b1015]/95 backdrop-blur-xl'>
			<div className='items-center gap-10 text-lg mt-[20%]'>
				<ul className='px-8 py-2 flex flex-col text-center gap-4 uppercase'>
					{menu.map((item) => (
						<Link
							locale={locale}
							key={item.id}
							href={item.url}
							onClick={() => dispatch(MobileMenus(mobilemenu))}
						>
							<li className={itemClass}>{t(item.title)}</li>
						</Link>
					))}

					<hr className='border-white/10 my-2' />
					<div className='relative'>
						{authUser ? (
							<div className='cursor-pointer relative flex flex-col gap-4'>
								<Link href={`/cabinet/${id}`}>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={itemClass}
									>
										{b('title')}
									</div>
								</Link>
								<Link href={`/purchases/${id}`}>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={itemClass}
									>
										{b('title1')}
									</div>
								</Link>

								<div
									className='w-full h-12 flex justify-center items-center rounded-xl bg-[#e2a550] hover:bg-[#d29440] text-black font-bold cursor-pointer transition-colors duration-300 mt-8'
									onClick={() => singout()}
								>
									{b('button')}
								</div>
							</div>
						) : (
							<Link href='/login'>
								<button
									onClick={() => dispatch(MobileMenus(mobilemenu))}
									className='w-full h-12 flex justify-center items-center rounded-xl bg-[#e2a550] hover:bg-[#d29440] text-black font-bold cursor-pointer transition-colors duration-300 mt-8'
								>
									<p className='text-lg'>{b('buton')}</p>
								</button>
							</Link>
						)}
					</div>
				</ul>
			</div>
		</div>
	)
}

export default MobileMenu
