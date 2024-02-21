"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslations } from 'next-intl'
import meetting from '../../../../public/assets/meetting.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import { useRouter } from '@/navigation'


const Meeting = () => {
	const router = useRouter()
	const dispatch = useDispatch()
		const { authUser } = useSelector(
			(state) => state.counter
		)

	const dataOrder = (e) => {
		if (!authUser) {
			router.push('/login')
		}
		dispatch(OrderPrice(4000))
		dispatch(OrderTitle("Meeting"))
		dispatch(OrderId(20244))
		router.push('/payment')
	}
	
		const t = useTranslations('Meeting')
	
  const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_YOUR_SERVICE_ID,
				process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID,
				form.current,
				process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY
			)
			.then(
				() => {
					toast.success('Message successfully sent!', {
						position: 'bottom-center',
						autoClose: 3500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
					const timeout = setTimeout(() => {
						window.location.reload(false)
					}, 3900)

					return () => clearTimeout(timeout)
				},
				() => {
					toast.error('Failed to send the message, please try again', {
						position: 'bottom-center',
						autoClose: 3500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
				}
			)
	}
  return (
		<div className='flex  items-center flex-col  px-[5%]'>
			<div className='text-2xl lg:text-3xl py-10'>{t('title')} *</div>
			<div className='flex gap-10 flex-col lg:flex-row  w-full'>
				<div className='flex-1 justify-center flex flex-col  '>
					<div className='  w-96 lg:w-full h-48 lg:h-96 relative   '>
						<Image
							src={meetting}
							alt='logo '
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							className='rounded-lg object-contain'
							priority
						/>
					</div>{' '}
					<div className='z-50 mt-5'>
						<button
							className='w-full  border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex    duration-300 hover:bg-blur z-50 text-lg uppercase px-10 '
							onClick={() => dataOrder()}
						>
							{t('button')}
						</button>
					</div>
				</div>{' '}
				<div className=' flex flex-1   relative cursor-pointer z-10 '>
					<form
						className='flex-1 flex flex-col gap-5 max-w-3xl'
						ref={form}
						onSubmit={sendEmail}
					>
						<div className='relative group '>
							<p className='absolute -top-3 left-4 text-zinc-300   px-3 flex justify-center text-[14px]  bg-[#11171c] rounded-2xl'>
								Your Name
							</p>
							<input
								type='text'
								name='name'
								required
								minLength='3'
								maxLength='50'
								className='bg-transparent border-2 border-zinc-700/50 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-zinc-700 decoration-transparent '
							/>
						</div>

						<div className='relative group '>
							<p className='absolute -top-3 left-4 text-zinc-300   w-16 flex justify-center text-[14px]  bg-[#11171c] rounded-2xl'>
								Email
							</p>
							<input
								required
								type='email'
								name='email'
								minLength='3'
								maxLength='50'
								className='bg-transparent border-2 border-zinc-700/50 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-zinc-700 decoration-transparent '
							/>
						</div>
						<div className='relative group '>
							<p className='absolute -top-3 left-4 text-zinc-300  px-2 w-fit flex justify-center text-[14px]  bg-[#11171c] rounded-2xl'>
								Message
							</p>
							<textarea
								className='w-full p-5 text-sm text-white mb-3 border-2 border-zinc-700/50 outline-none bg-transparent rounded-md group-hover:border-zinc-700'
								cols='30'
								rows='10'
								name='message'
								required
								minLength='3'
								maxLength='100'
							></textarea>
						</div>
						<button
							type='submit'
							className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16  uppercase duration-300 z-10 justify-center`}
						>
							Send
						</button>

						<ToastContainer />
					</form>
				</div>
			</div>
			<div className='text-[12px]'>* {t('description')}</div>
		</div>
	)
}

export default Meeting