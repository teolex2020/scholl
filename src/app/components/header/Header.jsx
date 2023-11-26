"use client"
import React from 'react'
import Image from 'next/image'
import {  Gentium_Book_Plus } from 'next/font/google'
import Menu from './Menu'
import Language from './Language'
import Link from 'next/link'
import logo from "../../../../public/logo.png"


const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})



const Header = () => {

  return (
		<header className='container mx-auto px-[5%] lg:px-0'>
			<div className='flex  justify-between h-[65px] lg:h-32 items-center '>

				<Link href='/'>
					<div className=' flex img w-24 h-24 relative cursor-pointer z-10'>
						<Image
							src={logo}
							alt='logo '
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
						/>
					</div>
				</Link>
				<div
					className='w-10 h-10 lg:hidden block'
					// onClick={() => dispatch(MobileMenu(mobilemenu))}
				>
					<svg
						fill='none'
						stroke='currentColor'
						strokeWidth='1.5'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						></path>
					</svg>
				</div>
				<Menu />
				<div className='lg:flex z-30 items-center space-x-10 hidden '>
					<Language />
					<Link href='/cabinet/1'>
						<button
							className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16 ${gentium.className} uppercase duration-300`}
						>
							<p className='duration-300  text-lg'>Вход</p>
						</button>
					</Link>
				</div>
			</div>
			{/* <div className=' w-full  rounded-sm px-3 text-center font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel distinctio aspernatur soluta, </div> */}

			<hr className='opacity-10' />
		</header>
	)
}

export default Header