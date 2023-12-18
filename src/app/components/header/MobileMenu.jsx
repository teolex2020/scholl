'use client'
import React from 'react'
import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { MobileMenus } from '@/store/features/counterSlice'


import { getAuth, signOut } from 'firebase/auth'

const menu = [
	{
		id: 1,
		title: 'course',
		url: '/course',
	},

	{
		id: 2,
		title: 'meeting',
		url: '/meeting',
	},
	{
		id: 3,
		title: 'brainstorm',
		url: '/brainstorm',
	},
	{
		id: 4,
		title: 'contact',
		url: '/contact',
	},
]

const MobileMenu = () => {
	const mobilemenu = useSelector((state) => state.counter.mobilemenu)
	const id = useSelector((state) => state.counter.id)

	const dispatch = useDispatch()
	const locale = useLocale()
	const t = useTranslations('Menu')
		const b = useTranslations('Popup')

	const singout = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				// dispatch(Authuser(localStorage.removeItem('user')))
				// dispatch(Id(localStorage.removeItem('token')))
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
					<div className='relative '>
						{id ? (
							<div className={` cursor-pointer relative`}>
								<Link href='/cabinet/1'>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center`}
									>
										<div>{b('title')}</div>
									</div>
								</Link>

								<div
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20`}
									onClick={() => singout()}
								>
									<div>{b('button')}</div>
								</div>
							</div>
						) : (
							<Link href='/login'>
								<button
									onClick={() => dispatch(MobileMenus(mobilemenu))}
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20`}
								>
									<p className='duration-300  text-lg'>{b('button1')}</p>
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
