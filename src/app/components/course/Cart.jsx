import React from 'react'
import Image from 'next/image'
import { ClockIcon, VideoCameraIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const Cart = () => {
  return (
		<div className='flex-1 flex justify-center '>
			{' '}
			<div className='w-80 bg-blur  rounded-md p-5 h-[430px]'>
				<div className='w-full  flex justify-center relative mt-1'>
					<div className='absolute  bg-blue-400 w-96 h-full blur-3xl rounded-full opacity-[20%]'></div>

					<Image
						src='/course.png'
						width={150}
						height={150}
						alt=''
						className='rounded-full'
					/>
				</div>
				<div className='flex justify-center items-center gap-6 font-semibold colorgold mt-6'>
					<p className=' text-xl'>Цена</p>
					<p className=' text-5xl'>11 $</p>
				</div>

				<div className='text-sm text-start px-10 mt-5 flex flex-col gap-3'>
					<div>
						<p>Курс включает в себя:</p>
					</div>
					<div className='flex gap-3 items-center'>
						<ClockIcon className='h-4 w-4 ' />
						<p>27 часов лекций</p>
					</div>
					<div className='flex gap-3 items-center'>
						<VideoCameraIcon className='h-4 w-4 ' />
						<p>видеоматериалы</p>
					</div>
					<div className='flex gap-3 items-center'>
						<AcademicCapIcon className='h-4 w-4 ' />
						<p>сертификат</p>
					</div>

					<div className='w-full flex justify-center '>
						<button className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-2xl px-10'>
							Купить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart