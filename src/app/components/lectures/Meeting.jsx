'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
	ClockIcon,
	AcademicCapIcon,
	CalendarIcon,
	VideoCameraIcon,
	EyeIcon,
} from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import { useRouter } from '@/navigation'

const train = [
	{
		id: 20244,
		image: '/assets/chapluga.webp',
		title: 'title',
		description: `description`,
		price: '1499',
		currency: '₴',
		time: '180',
		teacher: 'lectorname',
		data: '16.05.2024',
		times: '19.00',
		live: true,
	},
	// {
	// 	id: 20245,
	// 	image: '/assets/buziev.webp',
	// 	title: 'title1',
	// 	description: `description1`,
	// 	price: '1495',
	// 	currency: '₴',
	// 	time: '180',
	// 	teacher: 'lectorname1',
	// 	data: '30.04.2024',
	// 	times: '18.00',
	// 	live: true,
	// },
]

const Meeting = () => {
	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('Meeting')
	const dispatch = useDispatch()

	const dataOrder = (price, title, id) => {
		if (!authUser) {
			router.push('/login')
		}
		dispatch(OrderPrice(price))
		dispatch(OrderTitle(title))
		dispatch(OrderId(id))
		router.push('/payment')
	}
	const [isMobileDevice, setIsMobileDevice] = useState(false)
	const [expandedDescriptions, setExpandedDescriptions] = useState({})

	useEffect(() => {
		const handleResize = () => {
			setIsMobileDevice(window.matchMedia('(max-width: 767px)').matches)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const toggleExpanded = (id) => {
		setExpandedDescriptions((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}))
	}

	const truncateDescription = (description) => {
		const words = description.split(' ')
		return `${words.slice(0, 10).join(' ')}...`
	}

	return (
		<div className='h-full flex flex-col  items-center lg:items-start lg:justify-between container mx-auto relative mt-10 p-4 gap-10 '>
			{train.map((e, i) => (
				<div
					key={i}
					className='flex flex-col lg:flex-row rounded-lg border-2 border-zinc-800 p-3 max-w-7xl mx-auto h-fit gap-6 bg-blur w-full '
				>
					{!e.live ? (
						<div className='absolute top-2 right-3 bg-blue-700 rounded-full py-1 px-2 font-semibold text-sm flex items-center gap-3 '>
							<VideoCameraIcon className='w-5 h-5' />
							<p>{t('recorded')}</p>
						</div>
					) : (
						<div className='absolute top-2 right-3 bg-green-700 rounded-full py-1 px-2 font-semibold text-sm flex items-center gap-3'>
							<EyeIcon className='w-5 h-5' />
							<p>
								<p>{t('live')}</p>
							</p>
						</div>
					)}
					<div className='w-full h-72 lg:h-auto   lg:w-96  flex-shrink-0 relative rounded-lg border-4 border-zinc-800 mt-7 lg:mt-0'>
						<Image
							src={e.image}
							fill
							alt='image'
							className='object-cover rounded-lg'
							sizes='(min-width: 808px)'
							quality={80}
							loading='lazy'
						/>
					</div>
					<div className='flex flex-col justify-between flex-grow'>
						<div>
							<div className='colorgold  lg:text-3xl flex  w-full text-center sm:text-start font-semibold lg:pb-5'>
								<div className='text-2xl mb-5 lg:w-[80%] '>{t(e.title)}</div>
							</div>
							<div className='text-sm text-zinc-300 flex gap-3'>
								<ClockIcon className='w-5 h-5' />
								<span>
									{t('duration')} - {e.time} {t('tim')}
								</span>
							</div>
							<hr className='border-zinc-800' />
							{isMobileDevice ? (
								<div className='mb-4 py-2'>
									<div className='text-sm '>
										{expandedDescriptions[e.id] ? (
											<p className=''>{t(e.description)}</p>
										) : (
											<p className='line-clamp-4'>
												{truncateDescription(t(e.description))}
											</p>
										)}
									</div>
									<button
										onClick={() => toggleExpanded(e.id)}
										className=' mt-2 text-green-500 hover:text-green-500'
									>
										{expandedDescriptions[e.id] ? t('less') : t('more')} ....
									</button>
								</div>
							) : (
								<div className='py-2'>{t(e.description)}</div>
							)}
						</div>
						<div>
							<div className='text-sm text-zinc-300 flex gap-3 lg:py-3'>
								<AcademicCapIcon className='w-5 h-5' />
								<span>{t('lector')} - </span>
								<span className='uppercase'>{t(e.teacher)}</span>
							</div>
							<div className='text-sm text-zinc-300 flex gap-3 py-3'>
								<CalendarIcon className='w-5 h-5' />
								<span>{t('data')} - </span>
								<span className='uppercase'>{e.data}</span>
								<ClockIcon className='w-5 h-5' />
								<span className='uppercase'>{e.times}</span>
							</div>

							<div className='flex items-center'>
								<div className='w-full flex  '>
									<button
										onClick={() => dataOrder(e.price, t(e.title), e.id)}
										className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold  justify-center py-1 flex space-x-16 duration-300 hover:bg-blur z-10  px-10 min-w-[200px] w-full lg:w-80 font-extrabold font-sans text-3xl'
									>
										{e.price}
										{e.currency}
									</button>
								</div>
							</div>
							<div className='text-[10px] pt-3'>*{t('star')}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Meeting
