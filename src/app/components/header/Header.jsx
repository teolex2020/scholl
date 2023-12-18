'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import { Gentium_Book_Plus } from 'next/font/google'
import Menu from './Menu'
import Language from './Language'
import { Link } from '@/navigation'
import logo from '../../../../public/assets/logo.png'
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
	const authuser = useSelector((state) => state.counter.authUser)
 const [isAuthorized, setIsAuthorized] = useState(false)
useEffect(() => {
	setIsAuthorized(true)
}, [])


	return (
		<div className='container mx-auto   z-40'>
			{mobilemenu && <MobileMenu />}
			<div className='flex  justify-between h-[65px] lg:h-32 items-center  '>
				<Link href='/'>
					<div className=' flex img w-24 h-24 relative cursor-pointer z-10'>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742124/logo_k8ko99.png'
							alt='logo '
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							className='object-cover'
							priority
						/>
					</div>
				</Link>
				<MobileButon />
				<Menu />

				<Language />
				<div className='lg:flex hidden z-30 items-center mx-5 '>
					<Button font={gentium.className} />
				</div>
			</div>

			<hr className='opacity-10' />
		</div>
	)
}

export default Header
