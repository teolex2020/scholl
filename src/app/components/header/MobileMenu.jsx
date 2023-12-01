'use client'
import React from 'react'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'
import { MobileMenus } from '@/store/features/counterSlice'
import Image from 'next/image'
import { Authuser } from '@/store/features/counterSlice'
import { getAuth, signOut } from 'firebase/auth'

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
	const authuser = useSelector((state) => state.counter.authuser)

	const dispatch = useDispatch()



	const singout = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				console.log('Sign-out successful.')
				dispatch(Authuser(false))
			})
			.catch((error) => {
				console.log(error)
			})
	}

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
								className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center`}
							>
								{item.title}
							</li>
						</Link>
					))}
					<div className='relative '>
						{authuser ? (
							<div className={` cursor-pointer relative`}>
								<Link href='/cabinet/1'>
									<div
										onClick={() => dispatch(MobileMenus(mobilemenu))}
										className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center`}
									>
										<div>Мой кабинет</div>
									</div>
								</Link>

								<div
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20`}
									onClick={() => singout()
									}
								>
									<div>Выход</div>
								</div>
							</div>
						) : (
							<Link href='/login'>
								<button
									onClick={() => dispatch(MobileMenus(mobilemenu))}
									className={`border-2 rounded-3xl border-zinc-700/50 w-full h-12 flex  bg-blur cursor-pointer relative  justify-center items-center mt-20`}
								>
									<p className='duration-300  text-lg'>Вoйти</p>
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
