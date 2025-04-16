'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MobileMenus } from '@/store/features/counterSlice'
import { Bars3Icon } from '@heroicons/react/24/outline'

const MobileButon = () => {
	const dispatch = useDispatch()
	const mobilemenu = useSelector((state) => state.counter.mobilemenu)
	return (
		<div
			className='w-10 h-10 lg:hidden block  fixed top-3 right-3 z-50 bg-blur'
			onClick={() => dispatch(MobileMenus(mobilemenu))}
		>
			<Bars3Icon className='h-10 w-10' />
		</div>
	)
}

export default MobileButon
