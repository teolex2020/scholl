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

	return (
		<div className='fixed bg-menublur  w-screen h-screen top-0 -right-30 z-50 md:hidden '>
			<div className=' items-center   gap-10 text-xl mt-[18%] '>
				<ul
					className={`  px-10 py-2 flex flex-col  text-center gap-8  uppercase`}
				>
					{menu.map((item) => (
						<Link
							locale={locale}
							key={item.id}
							href={item.url}
							onClick={() => dispatch(MobileMenus(mobilemenu))}
						>
							<li
								className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center`}
							>
								{t(item.title)}
							</li>
						</Link>
					))}

					<hr className='border-2 rounded-3xl border-zinc-500/50' />
					<div className='relative '>
						{authUser ? (
							<div className={` cursor-pointer relative`}>
								<Link href={`/cabinet/${id}`}>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center`}
									>
										<div>{b('title')}</div>
									</div>
								</Link>
								<Link href={`/purchases/${id}`}>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-5`}
									>
										<div>{b('title1')}</div>
									</div>
								</Link>

								<div
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20 `}
									onClick={() => singout()}
								>
									<div>{b('button')} </div>
								</div>
							</div>
						) : (
							<Link href='/login' className=''>
								<button
									onClick={() => dispatch(MobileMenus(mobilemenu))}
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20`}
								>
									<p className='duration-300  text-lg'>{b('buton')}</p>
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
