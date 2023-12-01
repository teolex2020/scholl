import React, { useEffect, useRef } from 'react'
import {
	ArrowRightOnRectangleIcon,
	BuildingLibraryIcon,
} from '@heroicons/react/24/solid'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { PopupMenu, Authuser } from '@/store/features/counterSlice'

const Popup = () => {
	const dispatch = useDispatch()
	const popupmenu = useSelector((state) => state.counter.popupmenu)
	//  const documentClickHandler = useRef()
	const popupRef = useRef()

	useEffect(() => {
		function handleClickOutside(event) {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				dispatch(PopupMenu(popupmenu))
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [popupRef])

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

	const popup = () => {
		dispatch(PopupMenu(popupmenu))
	}

	return (
		<div
			className='absolute hidden lg:block right-0  top-14 w-48 shadow1 rounded-md p-5 z-50 bg-menublur'
			ref={popupRef}
		>
			<Link href='/cabinet/1'>
				<div
					className='flex space-x-5 py-3 hover:scale-105 cursor-pointer duration-300'
					onClick={popup}
				>
					<div>
						<BuildingLibraryIcon className='w-5 h-5' />
					</div>
					<div>Мой кабинет</div>
				</div>
			</Link>

			<div
				className='flex space-x-5 py-3 hover:scale-105 cursor-pointer duration-300'
				onClick={() => singout()}
			>
				<div>
					<ArrowRightOnRectangleIcon className='w-5 h-5' />
				</div>
				<div>Выход</div>
			</div>
		</div>
	)
}

export default Popup
