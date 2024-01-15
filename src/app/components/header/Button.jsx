'use client'
import { useState, useEffect } from 'react'
import {  useRouter } from '@/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Popup from './Popup'
import { PopupMenu } from '@/store/features/counterSlice'

import {  useTranslations } from 'next-intl'

const Button = ({ font }) => {
	const popupmenu = useSelector((state) => state.counter.popupmenu)
	const authuser = useSelector((state) => state.counter.authUser)

	const t = useTranslations('Header')

	const router = useRouter()
	const dispatch = useDispatch()

	const popup = () => {
		dispatch(PopupMenu(popupmenu))
	}

	 const [isAuthorized, setIsAuthorized] = useState(false)
		useEffect(() => {
			setIsAuthorized(true)
		}, [])

	return (
		<div className='relative '>
			{popupmenu && <Popup />}

			{isAuthorized ? (
				isAuthorized === authuser ? (
					<div
						className={`border-2 rounded-3xl border-zinc-700/50 w-12 h-12 flex  bg-blur cursor-pointer relative`}
						onClick={popup}
					>
						<Image
							src='https://firebasestorage.googleapis.com/v0/b/scholl-9cad5.appspot.com/o/photosite%2Fuser_hwrnp5.png?alt=media&token=0031326a-14c7-4e49-9357-d8c98798608d'
							fill
							alt='user'
							sizes='(min-width: 808px) 50vw, 100vw'
							priority
							className='object-cover'
						/>
						<div className='-bottom-1 -right-1 absolute border border-zinc-700/50 rounded-full bg-zinc-500'>
							<ChevronDownIcon className='h-4 w-4 ' />
						</div>
					</div>
				) : (
					<button
						onClick={() => router.push('/login')}
						className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16 ${font} uppercase duration-300`}
					>
						<p className='duration-300  text-lg'>{t('button')}</p>
					</button>
				)
			) : (
				<div className='h-10 w-14  relative flex justify-center items-center'>
					<div className='loaders absolute  '></div>
				</div>
			)}
		</div>
	)
}

export default Button
