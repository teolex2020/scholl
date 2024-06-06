import React from 'react'
import {
	ArrowRightEndOnRectangleIcon,
	BuildingLibraryIcon,
	CreditCardIcon,
} from '@heroicons/react/24/solid'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { PopupMenu, Authuser } from '@/store/features/counterSlice'
import { useTranslations } from 'next-intl'

const Popup = () => {
	const t = useTranslations('Popup')
	const dispatch = useDispatch()
	const popupmenu = useSelector((state) => state.counter.popupmenu)
	const id = useSelector((state) => state.counter.id)

	const togglePopup = () => {
		dispatch(PopupMenu(popupmenu))
	}

	const handleSignOut = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				dispatch(PopupMenu(popupmenu))
				dispatch(Authuser(false))
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div
			className='fixed inset-0 flex items-start justify-end bg-transparent'
			onClick={togglePopup}
		>
			<div
				className='absolute right-0 top-20 w-48 bg-blur rounded-md p-5 z-50 bg-menublur mr-[10%]'
				onClick={(e) => e.stopPropagation()}
			>
				<Link href={`/cabinet/${id}`}>
					<div
						className='flex space-x-5 py-3 hover:scale-105 cursor-pointer duration-300'
						onClick={togglePopup}
					>
						<BuildingLibraryIcon className='w-5 h-5' />
						<div>{t('title')}</div>
					</div>
				</Link>
				<Link href={`/purchases/${id}`}>
					<div
						className='flex space-x-5 py-3 hover:scale-105 cursor-pointer duration-300'
						onClick={togglePopup}
					>
						<CreditCardIcon className='w-5 h-5' />
						<div>{t('title1')}</div>
					</div>
				</Link>
				<div
					className='flex space-x-5 py-3 hover:scale-105 cursor-pointer duration-300'
					onClick={handleSignOut}
				>
					<ArrowRightEndOnRectangleIcon className='w-5 h-5' />
					<div>{t('button')}</div>
				</div>
			</div>
		</div>
	)
}

export default Popup
