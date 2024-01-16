"use client"
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ClockIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const train = [
	{
		image: '/assets/kill.png',
		title: 'title',
		descriptions: `descriptions`,
		price: '1100',
		currency: '₴',
		time: '90',
		teacher: 'lectorname',
	},
	{
		image: '/assets/prompt.png',
		title: 'titleT',
		descriptions: `descriptionsT`,
		price: '1100',
		currency: '₴',
		time: '90',
		teacher: 'lectornameT',
	},
]



const Trainings = () => {
	const t = useTranslations('BortnikTrain')

	return (
		<div className='h-full flex flex-col  items-center lg:items-start lg:justify-between container mx-auto relative mt-10 p-4 gap-10'>
			{train.map((e, i) => (
				<div
					key={i}
					className='flex flex-col lg:flex-row rounded-lg border-2 border-zinc-800 p-3 max-w-7xl mx-auto h-fit gap-6 bg-blur'
				>
					<div className='w-full h-72 sm:h-auto  lg:w-96  flex-shrink-0 relative rounded-lg border-4 border-zinc-800 mb-4 lg:mb-0'>
						<Image
							src={e.image}
							fill
							alt='image'
							className='object-cover rounded-lg'
							priority
							sizes='(min-width: 808px) 50vw, 100vw'
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
									{t('duration')} - {e.time} {t('time')}.
								</span>
							</div>
							<hr className='border-zinc-800' />
							<div className='py-2'>{t(e.descriptions)}</div>
						</div>
						<div>
							<div className='text-sm text-zinc-300 flex gap-3 py-3'>
								<AcademicCapIcon className='w-5 h-5' />
								<span>{t('lector')} - </span>
								<span className='uppercase'>{t(e.teacher)}</span>
							</div>

							<div className='flex items-center'>
								<div className='w-full flex  '>
									<button className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold  justify-center py-1 flex space-x-16 duration-300 hover:bg-blur z-10  px-10 min-w-[200px] w-full lg:w-80 font-extrabold font-sans text-3xl'>
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