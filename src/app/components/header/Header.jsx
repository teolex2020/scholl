'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Gentium_Book_Plus } from 'next/font/google'

import Language from './Language'
import { Link, useRouter } from '@/navigation'
import ButtonChat from '../chat/Button'
import Button from './Button.jsx'
import MobileButon from './MobileButon'
import MobileMenu from './MobileMenu'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../../../public/assets/logo.webp'
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
	const { mobilemenu, popupBell } = useSelector((state) => state.counter)

	const router = useRouter()
	const [query, setQuery] = useState('')



	const [activeBell, setActiveBell] = useState(false)


	const popup = () => {
		dispatch(PopupBell(popupBell))
	}

		const handleSearch = (e) => {
			e.preventDefault()
			if (query.trim()) {
				router.push(`/search?q=${encodeURIComponent(query.trim())}`)
			}
		}

	return (
		<div className='lg:container w-full mx-auto  z-40'>
			{mobilemenu && <MobileMenu />}
			{popupBell && <Popupbell />}
			{/* <ButtonChat /> */}
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
				<MobileDropdownMenu />

				<div className='py-3 w-full sm:px-10 hidden sm:block'>
					<form onSubmit={handleSearch} className='w-full '>
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className='w-full rounded-xl px-4 py-2 bg-[#1a1a1a] text-white placeholder:text-gray-400 border border-zinc-600 focus:outline-none'
							placeholder='Пошук курсів, лекцій або зустрічей...'
						/>
					</form>
				</div>
				<div className='flex  justify-center sm:justify-end  w-full absolute sm:relative'>
					{' '}
					<Language />
				</div>

				<div className='lg:flex hidden z-30 items-center  mx-5 '>
					<Button font={gentium.className} />
				</div>
				<div
					className='hidden relative cursor-pointer hover:scale-105 duration-500'
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
