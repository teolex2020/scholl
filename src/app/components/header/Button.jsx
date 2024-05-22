'use client'
import React from 'react'
import { useRouter } from '@/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Popup from './Popup'
import { PopupMenu } from '@/store/features/counterSlice'
import user from '../../../../public/assets/user.png'
import { useTranslations } from 'next-intl'

const Button = ({ font }) => {
	const { popupmenu, authUser } = useSelector((state) => state.counter)

	const t = useTranslations('Header')

	const router = useRouter()
	const dispatch = useDispatch()

	const popup = () => {
		dispatch(PopupMenu(popupmenu))
	}

	return (
		<div className='relative '>
			{popupmenu && <Popup />}

			{authUser ? (
				<div
					className={`border-2 rounded-3xl border-zinc-700/50 w-12 h-12 flex  bg-blur cursor-pointer relative`}
					onClick={popup}
				>
					<Image
						src={user}
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
			)}
		</div>
	)
}

export default Button
