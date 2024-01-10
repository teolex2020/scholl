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
		<div
			className=' fixed right-5 lg:right-[3%] bottom-[5%] flex gap-3 border-2 rounded-3xl border-zinc-700/50 px-5 py-2 items-center shadow2 bg-[#12181d] hover:scale-105 duration-500 cursor-pointer'
			onClick={buttonpopup}
		>
			<div>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 14 14'
					height='25'
					width='25'
				>
					<g id='ai-edit-spark--change-edit-modify-pencil-write-writing-artificial-intelligence-ai'>
						<path
							id='Vector'
							fill='#d7e0ff'
							d='m6.839 13.05 -3 0.26 0.26 -3 6.24 -6.2a1 1 0 0 1 1.43 0l1.27 1.28a0.998 0.998 0 0 1 0 1.42l-6.2 6.24Z'
							strokeWidth='1'
						></path>
						<path
							id='Vector_2'
							stroke='#4147d5'
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m6.839 13.05 -3 0.26 0.26 -3 6.24 -6.2a1 1 0 0 1 1.43 0l1.27 1.28a0.998 0.998 0 0 1 0 1.42l-6.2 6.24Z'
							strokeWidth='1'
						></path>
						<path
							id='Vector 2136'
							fill='#ffffff'
							d='M0.928 4.123c-0.35 -0.061 -0.35 -0.565 0 -0.626a3.176 3.176 0 0 0 2.559 -2.45L3.508 0.95c0.076 -0.346 0.57 -0.349 0.649 -0.002l0.026 0.112a3.193 3.193 0 0 0 2.565 2.436c0.353 0.06 0.353 0.567 0 0.629A3.193 3.193 0 0 0 4.183 6.56l-0.026 0.113c-0.08 0.346 -0.573 0.344 -0.649 -0.003l-0.021 -0.097a3.176 3.176 0 0 0 -2.559 -2.45Z'
							strokeWidth='1'
						></path>
						<path
							id='Vector 2137'
							stroke='#4147d5'
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M0.928 4.123c-0.35 -0.061 -0.35 -0.565 0 -0.626a3.176 3.176 0 0 0 2.559 -2.45L3.508 0.95c0.076 -0.346 0.57 -0.349 0.649 -0.002l0.026 0.112a3.193 3.193 0 0 0 2.565 2.436c0.353 0.06 0.353 0.567 0 0.629A3.193 3.193 0 0 0 4.183 6.56l-0.026 0.113c-0.08 0.346 -0.573 0.344 -0.649 -0.003l-0.021 -0.097a3.176 3.176 0 0 0 -2.559 -2.45Z'
							strokeWidth='1'
						></path>
					</g>
				</svg>
			</div>
			<div className='  '>Your AI Assistant</div>
		</div>
	)
}

export default ButtonChat