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
import { useSelector, useDispatch } from 'react-redux'
import logo from "../../../../public/assets/logo.webp"
import { BellIcon } from '@heroicons/react/24/solid'
import Popupbell from './PopupBell'
import { PopupBell } from '@/store/features/counterSlice'
import MobileDropdownMenu from '../TestStartPage/MobileDropMenu'
import Search from '../Search/Search'




const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Header = () => {
	const dispatch = useDispatch()
	const { mobilemenu, popupBell } = useSelector(
		(state) => state.counter
	)

	const [searchQuery, setSearchQuery] = useState('') 
 const [isAuthorized, setIsAuthorized] = useState(false)
  const [activeBell, setActiveBell] = useState(false)
useEffect(() => {
	setIsAuthorized(true)
}, [])

const popup = () => {
	dispatch(PopupBell(popupBell))
}


	return (
		<div className='lg:container w-full mx-auto  z-40'>
			{mobilemenu && <MobileMenu />}
			{popupBell && <Popupbell />}
			<ButtonChat />
			<div className='flex  md:justify-between h-[65px] lg:h-24 items-center relative '>
				<Link href='/'>
					<div className=' flex img w-24 h-24 relative cursor-pointer z-10'>
						<Image
							src={logo}
							alt='logo '
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							quality={70}
							priority
						/>
					</div>
				</Link>

				<MobileButon />
				{/* <MobileDropdownMenu /> */}
				<Menu />
				{/* <div className='py-3 w-full sm:px-10'>
					<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				</div> */}
				<div className='flex  justify-center  w-fit'>
					{' '}
					<Language />
				</div>

				<div className='lg:flex hidden z-30 items-center  mx-5 '>
					<Button font={gentium.className} />
				</div>
				<div
					className='relative cursor-pointer hover:scale-105 duration-500'
					onClick={popup}
				>
					<BellIcon className='w-7 h-7 s stroke-zinc-200 fill-none' />

					<div
						className={`w-3 h-3 absolute  rounded-full right-0 bottom-1 ${
							activeBell ? 'bg-green-500' : 'bg-zinc-500'
						} `}
					></div>
				</div>
			</div>

			<hr className='opacity-10' />
		</div>
	)
}

export default Header
