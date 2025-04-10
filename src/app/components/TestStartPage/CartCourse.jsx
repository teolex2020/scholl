'use client'
import React from 'react'
import Image from 'next/image'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'

const CartCourse = ({ lector, price, title, id, image }) => {
	const t = useTranslations('BortnikTrain')
	const route = useRouter()

	return (
		<div
			onClick={() => route.push(`/course/${id}`)}
			className='w-full max-w-[280px] rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all  hover:scale-105 duration-700'
		>
			<div className='relative w-full h-40'>
				<Image
					src={`/assets/${image}`}
					alt={title}
					fill
					sizes='(min-width: 808px) 50vw, 100vw'
					className='object-cover'
				/>
			</div>

			<div className='p-4 flex flex-col gap-2'>
				<p className='text-base font-semibold line-clamp-2'>{title}</p>

				<div className='text-sm text-[#e2a550] flex items-center gap-2'>
					<AcademicCapIcon className='h-4 w-4' />
					<span>{lector}</span>
				</div>

			</div>
		</div>
	)
}

export default CartCourse
