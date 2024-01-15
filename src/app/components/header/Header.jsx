'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import { Gentium_Book_Plus } from 'next/font/google'
import Menu from './Menu'
import Language from './Language'
import { Link } from '@/navigation'
import ButtonChat from '../chat/Button'
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
		<div className='lg:container w-full mx-auto   z-40'>
			{mobilemenu && <MobileMenu />}
			<ButtonChat />
			<div className='flex  justify-between h-[65px] lg:h-24 items-center  '>
				<Link href='/'>
					<div className=' flex img w-24 h-24 relative cursor-pointer z-10'>
						<Image
							src='https://firebasestorage.googleapis.com/v0/b/scholl-9cad5.appspot.com/o/photosite%2Flogo_k8ko99.png?alt=media&token=2770febc-52d1-482e-87ab-100d300e10d6'
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
