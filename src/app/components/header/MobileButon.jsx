"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MobileMenus } from '@/store/features/counterSlice'

const MobileButon = () => {
  const dispatch = useDispatch()
  const mobilemenu = useSelector((state) => state.counter.mobilemenu)
  return (
		<div
			className='w-10 h-10 lg:hidden block  fixed top-3 right-3 z-50'
			onClick={() => dispatch(MobileMenus(mobilemenu))}
		>
			<svg
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
				></path>
			</svg>
		</div>
	)
}

export default MobileButon