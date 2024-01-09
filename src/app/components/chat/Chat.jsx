'use client'
import { useMemo, useRef, useEffect, useState } from 'react'
import { useChat } from 'ai/react'
import { ToastContainer, toast } from 'react-toastify'

import {
	PaperAirplaneIcon,
	ArrowLeftIcon,
	ArrowPathIcon,
	StopCircleIcon,
} from '@heroicons/react/24/solid'
import { Gentium_Book_Plus } from 'next/font/google'
import Image from 'next/image'
import Message from './Message'
import { useTranslations } from 'next-intl'
import GrowingTextArea from './Textarea'
import Select from 'react-select'
import { prompts } from './prompt'
import {useSelector, useDispatch} from "react-redux"
import { Chats } from '@/store/features/counterSlice'


const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Chat = ({ lang }) => {
	const dispatch = useDispatch()
	
	const [selectedOption, setSelectedOption] = useState()
	const chat = useSelector((state) => state.counter.chat)



	const prompt = useMemo(() => {
		return prompts.find((item) => item.id === lang)?.prompt
	}, [lang])

	

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		error,
		reload,
		stop,
	} = useChat({ body: { prompt } })

	const buttonpopup = () => {
		dispatch(Chats(chat))
	}

	const t = useTranslations('Chat')
	const messagesEndRef = useRef(null)
	const options = [
		{
			value: '1',
			label: t('theme1'),
		},
	]

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	return (
		<div
			className={` mx-auto max-w-md w-full lg:min-w-[450px] h-full  flex flex-col items-center justify-center gap-5 overflow-auto fixed bottom-0 right-0 bg-[#12181c] z-[100] border-l-2 border-zinc-800 ${
				chat
					? 'transition duration-700 ease-in-out translate-x-[100%] '
					: 'transition duration-700 ease-in-out translate-x-[0%]'
			}`}
		>

			<ToastContainer position='top-right' autoClose={1000} />
			<div
				className='w-10 left-1 px-1 absolute top-3 cursor-pointer group  '
				onClick={buttonpopup}
			>
				<div className=' flex  h-10  w-8  relative justify-center   '>
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
						chat
							? 'rotate-0 transition duration-700 ease-in-out'
							: 'rotate-180 transition duration-700 ease-in-out'
					}`}
				>
					<ArrowLeftIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px] ' />
				</button>
			</div>

			<div
				className={` ${gentium.className} text-2xl px-10 lg:pt-10 text-center text-[#e2a550]`}
			>
				<p className='text-4xl font-semibold'>{t('title1')} </p>
				<p>{t('title2')} </p>
			</div>
			<div className=' h-full w-full px-10 '>
				<div className='max-w-md '>
					<Select
						placeholder={`${t('theme')}`}
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
						className='text-black bg-black basic-single'
						instanceId={'wsad123wqwe'} // виправляє помилку
					/>
				</div>
				<div className='my-6 max-h-[400px]  lg:max-h-[550px] elem scroll overflow-y-scroll'>
					{messages.length !== 0
						? messages.map((e, i) => (
								<Message key={i} role={e.role} content={e.content} />
						  ))
						: ''}
					{isLoading ? (
						<div className='w-full h-full flex justify-center items-center loaders'></div>
					) : (
						''
					)}

					<div ref={messagesEndRef} />
					<div className='w-full h-full flex justify-center items-center'>
						{error?.message}
					</div>
				</div>
			</div>
			<div className='flex items-start w-full'>
				<form
					onSubmit={handleSubmit}
					className={`w-full p-5 ${chat && 'ml-6'}`}
				>
					<div className='flex w-full justify-end gap-5 px-5 py-2'>
						<div
							className=' flex justify-end  cursor-pointer'
							onClick={() => stop()}
						>
							<StopCircleIcon className='h-6 w-6 stroke-slate-100 fill-slate-100 stroke-[1px] ' />
						</div>
						<div
							className=' flex justify-end  cursor-pointer'
							onClick={() => reload()}
						>
							<ArrowPathIcon className='h-6 w-6 stroke-slate-100 fill-none stroke-[1px] ' />
						</div>
					</div>

					<div className='group w-full py-1 flex items-center rounded-3xl bg-white elem scroll shadow-md z-20'>
						<GrowingTextArea
							onChange={handleInputChange}
							value={input}
							className=' w-full  max-w-3xl
							 text-black bottom-0  rounded-lg  p-2 border-none outline-none px-5  max-h-[200px] scroll overflow-y-scroll'
						/>
						<button
							type='submit'
							className='relative   py-2 text-[#a1a1a1] text-base   rounded-r-md  hover:text-white w-20  flex justify-center items-center '
						>
							{' '}
							{isLoading ? (
								<div className='loader  '></div>
							) : (
								<PaperAirplaneIcon className='h-6 w-6 -rotate-12 stroke-[#12181c] fill-[#12181c]  ' />
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Chat
