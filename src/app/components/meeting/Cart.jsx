"use client"
import React from 'react'
import Image from 'next/image'
import { ClockIcon, VideoCameraIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

import { useTranslations } from 'next-intl'


const Cart = ({ dataOrder, price, alltime, image, active }) => {
	
	const t = useTranslations('Card')
	return (
		<div className=' md:w-96 bg-[#13181d] relative  rounded-lg p-5 '>
			<div className=' bg-blur absolute top-0 right-0 left-0 bottom-0 z-0 rounded-lg'></div>
			<div className='lg:w-[320px] h-48 md:h-64 mx-auto  flex justify-center relative mt-1'>
				<Image
					src={`/assets/${image}`}
					sizes='(min-width: 808px) 50vw, 100vw'
					fill
					alt='bortnikcourse'
					className=' object-cover'
					priority
				/>
			</div>
			<div className='flex pl-10 md:pl-0 md:justify-center items-center gap-6 font-semibold colorgold md:mt-6 mt-2 py-3'>
				<p className='z-10 text-xl'>{t('price')}</p>
				<p className='z-10 text-3xl md:text-5xl'>{price} ₴</p>
			</div>

			<div className='text-sm text-start px-10 md:mt-5 flex flex-col gap-3 '>
				<div className='z-10'>
					<p>{t('course')}</p>
				</div>
				<div className='flex gap-3 items-center z-10'>
					<ClockIcon className='h-4 w-4 ' />
					<p>
						{alltime} {t('time')}
					</p>
				</div>
				<div className='flex gap-3 items-center z-10'>
					<VideoCameraIcon className='h-4 w-4 ' />
					<p> {t('video')}</p>
				</div>

				<div className='w-full flex justify-center '>
					<button
						disabled={!active}
						className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-2xl px-10 min-w-[200px]'
						onClick={() => dataOrder()}
					>
						{t('button')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart