'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
	ClockIcon,
	AcademicCapIcon,
	CalendarIcon,
} from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import { useRouter } from '@/navigation'

const train = [
	{
		id: 20242,
		image: '/assets/kill.jpg',
		title: 'title',
		descriptions: `descriptions`,
		price: '550',
		currency: '₴',
		time: '90',
		teacher: 'lectorname',
		data: '03.04.2024',
		times: '19.00',
		discont:"-50%"
	},
	// {
	// 	id: 20243,
	// 	image: '/assets/prompt.jpg',
	// 	title: 'titleT',
	// 	descriptions: `descriptionsT`,
	// 	price: '1100',
	// 	currency: '₴',
	// 	time: '90',
	// 	teacher: 'lectornameT',
	// 	data: '',
	// 	times: '',
	// },
]

const Trainings = () => {
	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('BortnikTrain')
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
					{e.discont.length > 0 ? (
						<div className='absolute top-2 right-3 bg-red-700 rounded-full py-1 px-2 font-bold text-xl'>
							-50%
						</div>
					) : (
						''
					)}

					<div className='w-full h-72 lg:h-auto   lg:w-96  flex-shrink-0 relative rounded-lg border-4 border-zinc-800 mb-4 lg:mb-0'>
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
							<div className='colorgold text-2xl lg:text-3xl flex  w-full text-center sm:text-start font-semibold pb-5'>
								<div>{t(e.title)}</div>
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
									<div className=''>
										{expandedDescriptions[e.id] ? (
											<p className=''>{t(e.descriptions)}</p>
										) : (
											<p className='line-clamp-4'>
												{truncateDescription(t(e.descriptions))}
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
								<div className='py-2'>{t(e.descriptions)}</div>
							)}
						</div>
						<div>
							<div className='text-sm text-zinc-300 flex gap-3 py-3'>
								<AcademicCapIcon className='w-5 h-5' />
								<span>{t('lector')} - </span>
								<span className='uppercase'>{t(e.teacher)}</span>
							</div>
							{/* <div className='text-sm text-zinc-300 flex gap-3 py-3'>
								<CalendarIcon className='w-5 h-5' />
								<span>{t('data')} - </span>
								<span className='uppercase'>{e.data}</span>
								<ClockIcon className='w-5 h-5' />
								<span className='uppercase'>{e.times}</span>
							</div> */}

							<div className='flex items-center'>
								<div className='w-full flex  '>
									<button
										onClick={() => dataOrder(e.price, t(e.title), e.id)}
										className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold  justify-center py-1 flex space-x-16 duration-300 hover:bg-blur z-10  px-10 min-w-[200px] w-full lg:w-80 font-extrabold font-sans text-3xl items-center gap-3'
									>
										<p className='  text-xl text-center opacity-50 line-through text-zinc-400/50 '>
											1100₴
										</p>
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

export default Trainings
