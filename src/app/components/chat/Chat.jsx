'use client'
import React, {useState} from 'react'
import { useCompletion } from 'ai/react'
import { ToastContainer, toast } from 'react-toastify'
import { ArrowLeftIcon} from '@heroicons/react/24/solid'
import { Gentium_Book_Plus } from 'next/font/google'
import Image from 'next/image'
const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Chat = () => {
    const {
			completion,
			input,
			stop,
			isLoading,
			handleInputChange,
			handleSubmit,
		} = useCompletion({
		  onFinish: () => {
        // do something with the completion result
        toast.success("Successfully generated completion!");}
		})

const [active, setActive] = useState(true)    
const buttonpopup = () => {
  setActive(!active)
}


	return (
		<div
			className={` mx-auto max-w-md w-full lg:min-w-[450px] h-full  flex flex-col items-center justify-center gap-5 overflow-auto fixed bottom-0 right-0 bg-[#12181c] z-[100] border-l-2 border-zinc-800 ${
				active
					? 'transition duration-700 ease-in-out translate-x-[91%] '
					: 'transition duration-700 ease-in-out translate-x-[0%]'
			}`}
		>
			<ToastContainer position='top-right' autoClose={1000} />
			<div className='w-full px-1 absolute top-3 cursor-pointer group' onClick={buttonpopup}>
				<div className=' flex  h-10  w-8  relative justify-center  '>
					<div className='absolute  bg-blue-300 w-20 h-full blur-3xl rounded-full opacity-[15%]'></div>
					<div className='absolute bg-blue-200 w-20 h-20  blur-3xl rounded-full opacity-[25%]'></div>
					<Image
						src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742094/bg_h4hr1y.png'
						alt='trees '
						fill
						sizes='(min-width: 808px) 50vw, 100vw'
						className='object-cover group-hover:scale-105'
						priority
					/>
				</div>
				<button
					className={` py-5 pr-2 ${
						active
							? 'rotate-0 transition duration-700 ease-in-out'
							: 'rotate-180 transition duration-700 ease-in-out'
					}`}
				>
					<ArrowLeftIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px] ' />
				</button>
			</div>
			{/* <div className=' flex  h-36  w-48  relative justify-center  '>
				<div className='absolute  bg-blue-300 w-48 h-full blur-3xl rounded-full opacity-[15%]'></div>
				<div className='absolute bg-blue-200 w-48 h-48  blur-3xl rounded-full opacity-[25%]'></div>
				<Image
					src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742094/bg_h4hr1y.png'
					alt='trees '
					fill
					sizes='(min-width: 808px) 50vw, 100vw'
					className='object-cover'
					priority
				/>
			</div> */}
			<div className={` ${gentium.className} text-2xl px-10 text-center `}>
				<p> Твой ИИ </p>
				<p> проводник по курсам</p>
			</div>
			<div className=' h-full w-full px-10 '>
				<div className='my-6'>{completion}</div>
			</div>
			<div className='flex items-start w-full'>
				<form onSubmit={handleSubmit} className='w-full p-5 ml-6'>
					<input
						className='w-full  bottom-0 border border-gray-300 rounded p-2 shadow-xl'
						value={input}
						placeholder='Задай вопрос ...'
						onChange={handleInputChange}
					/>
				</form>
			</div>
		</div>
	)
}

export default Chat
