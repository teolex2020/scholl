"use client"
import React from 'react'
import Image from 'next/image'
import {  Gentium_Book_Plus } from 'next/font/google'
import Menu from './Menu'
import Language from './Language'
import Link from 'next/link'
import logo from "../../../../public/logo.png"
import Button from './Button.jsx'
import MobileButon from './MobileButon'
import MobileMenu from './MobileMenu'
import { useSelector } from 'react-redux'


const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})





const Header = () => {
const mobilemenu = useSelector((state) => state.counter.mobilemenu)



  return (
		<header className='container mx-auto px-[5%] lg:px-0 z-40'>
			
			{mobilemenu && <MobileMenu />}
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
				<MobileButon />
				<Menu />
				<div className='lg:flex z-30 items-center space-x-10 hidden '>
					<Language />
					<Button font={gentium.className} />
				</div>
			</div>

			<hr className='opacity-10' />
		</header>
	)
}

export default Header