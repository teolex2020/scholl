'use client'
import React , {useState } from 'react'
import Image from 'next/image'
import {
	ClockIcon,
	AcademicCapIcon,
	VideoCameraIcon,
	EyeIcon,
} from '@heroicons/react/24/solid'

import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'

const CartCourse = ({ lector, price, status, title, id, image, course }) => {
	const t = useTranslations('BortnikTrain')
	const route = useRouter()

	const [showPopup, setShowPopup] = useState(false)

	return (
		<div
			className='flex flex-col w-[322px] bg-blur rounded-lg p-3 sm:h-[400px] hover:shadow1 duration-500 gap-2 cursor-pointer relative'
			onClick={() => route.push(`/course/${id}`)}
		>
			<div className='flex  flex-row-reverse sm:flex-col'>
				<div>
					{' '}
					{status ? (
						<div className='absolute top-5 right-4 bg-white text-black border-2 border-black rounded-lg py-1 px-2 font-bold text-sm hidden sm:flex items-center gap-3 z-10'>
							<VideoCameraIcon className='w-5 h-5' />
							{/* <p>{t('recorded')}</p> */}
						</div>
					) : (
						<div className='absolute top-5 right-4 bg-white text-black border-2 border-black rounded-lg py-1 px-2 font-bold text-sm flex items-center gap-3 z-10'>
							<EyeIcon className='w-5 h-5' />
							{/* <p>{t('live')}</p> */}
						</div>
					)}
					<div className='sm:w-[300px] w-20 h-20 sm:min-h-48   relative mt-1 '>
						<Image
							src={`/assets/${image}`}
							sizes='(min-width: 808px) 50vw, 100vw'
							fill
							alt=''
							className='object-cover rounded-lg'
							priority
						/>
					</div>
				</div>
				<div className='flex justify-center gap-2 mt-3  flex-col-reverse'>
					{' '}
					<div className='flex gap-3 items-center text-[14px] text-[#e2a550]'>
						<AcademicCapIcon className='h-4 w-4 ' />
						<p>{lector}</p>
					</div>
					<div
						className='relative'
						onMouseEnter={() => setShowPopup(true)}
						onMouseLeave={() => setShowPopup(false)}
					>
						<p className='text-base h-[50px] px-2 line-clamp-2 overflow-hidden text-ellipsis'>
							{title}
						</p>
						{showPopup && (
							<div className='absolute -top-full left-0 w-[300px] bg-white text-black shadow-lg rounded-lg p-3 z-20'>
								{title}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='w-full flex justify-center font-semibold'>
				<button className='mt-5 border-2 rounded-xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex items-center duration-300 hover:bg-blur z-10 text-2xl px-5 min-w-48'>
					<p className='text-xl'>{price} ₴</p>
				</button>
			</div>
		</div>
	)
}

export default CartCourse
