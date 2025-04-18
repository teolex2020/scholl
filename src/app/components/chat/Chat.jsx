'use client'

import React, { useRef, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAssistant } from '@ai-sdk/react'
import {
	ArrowPathIcon,
	StopCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid'
import { Gentium_Book_Plus } from 'next/font/google'
import { useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { stripCitations } from './stripCitations'

import { Chats } from '@/store/features/counterSlice'
import Message from './Message'
import GrowingTextArea from './Textarea'


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const gentium = Gentium_Book_Plus({ weight: '400', subsets: ['latin'] })

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Chat = () => {
	const dispatch = useDispatch()
	const { chat } = useSelector((state) => state.counter) 
	const {
		error,
		status,
		messages,
		input,
		submitMessage,
		handleInputChange,
		stop,
		reload,
	} = useAssistant({ api: '/api/assistant' })

	const t = useTranslations('Chat')
		const messagesEndRef = useRef (null)

			useEffect(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, [messages])

	// ---------------------------------------------------------------------------
	// Effects
	// ---------------------------------------------------------------------------

	useEffect(() => {
		if (error) toast.error(error.message)
	}, [error])

	// ---------------------------------------------------------------------------
	// Callbacks
	// ---------------------------------------------------------------------------

	const toggleChat = useCallback(() => dispatch(Chats(chat)), [dispatch, chat])



	return (
		<div
			className={` mx-auto max-w-md w-full lg:min-w-[450px] h-full  flex flex-col items-center justify-center gap-5 overflow-auto fixed bottom-0 right-0 bg-[#12181c] z-[100] border-l-2 border-zinc-800 ${
				chat ? 'translate-x-[100%]' : 'translate-x-[0%]'
			} transition duration-700 ease-in-out pb-5`}
		>
			{/* Close button */}
			<button
				onClick={toggleChat}
				aria-label='Close chat'
				className='group absolute left-1 top-3 flex w-10 cursor-pointer items-center px-1 pr-2'
			>
				<XMarkIcon className='h-8 w-9 fill-slate-100 stroke-slate-100 stroke-[1px]' />
				<span className='sr-only'>Close</span>
			</button>

			{/* Header */}
			<header
				className={`
					${gentium.className}
					'px-10 pt-10 text-center text-2xl text-[#e2a550]'
				`}
			>
				<p className='text-4xl font-semibold'>{t('title1')}</p>
				<p>{t('title2')}</p>
			</header>

			{/* Message list */}
			<section className='h-full w-full px-10'>
				<div className='elem scroll my-6 max-h-[400px] overflow-y-scroll lg:max-h-[550px]'>
					{messages.map(({ role, content }, idx) => (
						<Message key={idx} role={role} content={stripCitations(content)} />
					))}
					{status === 'in_progress' && <span>thinking...</span>}
					{error && <div>{error.message}</div>}
					<div ref={messagesEndRef} />
				</div>
			</section>

			{/* Input */}
			<form
				onSubmit={submitMessage}
				className={`'w-full p-5' ${chat && 'ml-6'})`}
			>
				{/* Controls */}
				<div className='flex w-full justify-end gap-5 px-5 py-2'>
					<button
						type='button'
						onClick={stop}
						aria-label='Stop generation'
						className='flex cursor-pointer justify-end'
					>
						<StopCircleIcon className='h-6 w-6 fill-slate-100 stroke-slate-100 stroke-[1px]' />
					</button>
					<button
						type='button'
						onClick={reload}
						aria-label='Reload last message'
						className='flex cursor-pointer justify-end'
					>
						<ArrowPathIcon className='h-6 w-6 fill-none stroke-slate-100 stroke-[1px]' />
					</button>
				</div>

				<div className='group elem scroll z-20 flex w-full items-center rounded-3xl bg-white py-1 shadow-md'>
					<GrowingTextArea
						onChange={handleInputChange}
						value={input}
						className='scroll max-h-[200px] w-full max-w-3xl rounded-lg border-none p-2 px-5 text-black outline-none'
					/>
					{/* Hidden submit button so Enter works inside textarea */}
					<button
						type='submit'
						aria-label='Send message'
						className='relative flex w-20 items-center justify-center rounded-r-md py-2 text-base text-[#a1a1a1] hover:text-white'
					/>
				</div>
			</form>
		</div>
	)
}

export default Chat
