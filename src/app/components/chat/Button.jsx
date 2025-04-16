'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Chats } from '@/store/features/counterSlice'
import { useTranslations } from 'next-intl'
import {
	PhoneIcon,
	EnvelopeOpenIcon,
	CameraIcon,
	SparklesIcon
} from '@heroicons/react/24/solid'

const ButtonChat = () => {
	const dispatch = useDispatch()
	const chat = useSelector((state) => state.counter.chat)

	const buttonpopup = () => {
		dispatch(Chats(chat))
	}

	const t = useTranslations('ButtonChat')

	return (
		<div
			className=' fixed right-5 lg:right-[3%] bottom-[5%] flex gap-3 border-2 rounded-3xl border-zinc-700/50 px-5 py-2 items-center shadow2 bg-[#12181d] hover:scale-105 duration-500 cursor-pointer'
			onClick={buttonpopup}
		>
			<div>
				<SparklesIcon className='h-5 w-5' />
			</div>
			<div className=' hidden md:block '> {t('title')}</div>
		</div>
	)
}

export default ButtonChat
