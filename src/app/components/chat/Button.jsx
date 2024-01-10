"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Chats } from '@/store/features/counterSlice'
import Image from 'next/image'


const ButtonChat = () => {
  	const dispatch = useDispatch()
    const chat = useSelector((state) => state.counter.chat)

const buttonpopup = () => {
	dispatch(Chats(chat))
}

  return (
		<div className=' fixed right-5 lg:right-[3%] bottom-[5%]  '>
			<div className=' h-10 w-32 relative ' onClick={buttonpopup}>
				<div className='  absolute inline-flex h-full w-full  opacity-30 '></div>
				<Image
					src='/assets/button.png'
					alt='trees '
					fill
					className='object-cover shadow3 hover:scale-105 duration-500'
					priority
				/>
			</div>
		</div>
	)
}

export default ButtonChat