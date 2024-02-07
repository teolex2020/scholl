'use client'
import React from 'react'
import clsx from 'clsx'
import {
	CheckIcon,
	CreditCardIcon,
	BookmarkIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import order from '../../../../public/assets/order.webp'
import { useSelector } from 'react-redux'
import { useRouter } from '@/navigation'

const Payments = () => {
	const { orderPrice, orderTitle } = useSelector((state) => state.counter
	)


	const router = useRouter()

	return (
		<div className='min-w-screen h-fit bg-transparent flex  justify-center px-5 mt-10 z-50'>
			<div
				className={clsx(
					'w-full mx-auto rounded-lg bg-transparent shadow1 p-5 text-gray-700 flex',
					'max-w-sm'
				)}
			>
				<div className='flex-1'>
					<div className='relative w-full h-48 rounded-xl border-4 border-zinc-800 '>
						<Image
							src={order}
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							alt='course'
							className=' object-cover rounded-lg'
							priority
						/>
					</div>
					<h2 className='w-full text-center pt-5 text-3xl text-slate-400 font-semibold'>
						Ваше замовлення:
					</h2>
					<div className='flex gap-2 py-5 text-[#e2a550] text-xl font-serif font-semibold'>
						<div>
							<CheckIcon className='h-6 w-6 text-green-500' />
						</div>
						{orderTitle}
					</div>
					<div className='text-white space-x-5 text-xl flex'>
						<div>
							<BookmarkIcon className='h-6 w-6 text-green-500' />
						</div>
						<span>Кількість:</span> <span>1 шт.</span>
					</div>
					<div className='text-white space-x-5 text-xl flex mt-5'>
						<div>
							<CreditCardIcon className='h-6 w-6 text-green-500' />
						</div>
						<span>Вартість:</span> <span>{orderPrice} ₴.</span>
					</div>
					<div className='z-50 flex justify-center'>
						<button className='mt-10 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16 duration-300 hover:bg-blur z-50 text-lg lg:text-2xl px-10'>
							Перейти до оплати
						</button>
					</div>
					<div className='flex justify-center w-full'>
						<button
							onClick={() => router.back()}
							className='py-2 flex text-slate-400 z-10 text-center text-lg hover:text-slate-300'
						>
							Cкасувати замовлення
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payments
