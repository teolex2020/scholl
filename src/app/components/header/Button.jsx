"use client"

import Link from 'next/link'
import {useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import {
ChevronDownIcon
} from '@heroicons/react/24/solid'
import Popup from './Popup'
import { PopupMenu } from '@/store/features/counterSlice'


const Button = ({font}) => {
   const authuser = useSelector((state) => state.counter.authuser)
  const popupmenu = useSelector((state) => state.counter.popupmenu)
	

	const dispatch=useDispatch()

const popup = ()=>{
dispatch(PopupMenu(popupmenu))
}

  return (
		<div className='relative '>
			{popupmenu && <Popup />}

			{true ? (
				<div
					className={`border-2 rounded-3xl border-zinc-700/50 w-12 h-12 flex  bg-blur cursor-pointer relative`}
					onClick={popup}
				>
					<Image src='/user.png' fill alt='user' priority />
					<div className='-bottom-1 -right-1 absolute border border-zinc-700/50 rounded-full bg-zinc-500'>
						<ChevronDownIcon className='h-4 w-4 ' />
					</div>
				</div>
			) : (
				<Link href='/login'>
					<button
						className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16 ${font} uppercase duration-300`}
					>
						<p className='duration-300  text-lg'>Вoйти</p>
					</button>
				</Link>
			)}
		</div>
	)
}

export default Button