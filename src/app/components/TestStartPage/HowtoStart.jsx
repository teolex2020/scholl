'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const HowToStart = () => {
	const t = useTranslations('HowTo')

	const steps = [
		{
			id: 1,
			title: t('step1.title'),
			description: t('step1.description'),
			image: '/assets/step1.png',
		},
		{
			id: 2,
			title: t('step2.title'),
			description: t('step2.description'),
			image: '/assets/step2.png',
		},
		{
			id: 3,
			title: t('step3.title'),
			description: t('step3.description'),
			image: '/assets/step3.png',
		},
		{
			id: 4,
			title: t('step4.title'),
			description: t('step4.description'),
			image: '/assets/step4.png',
		},
	]

	return (
		<section className='max-w-[1400px] mx-auto rounded-xl py-5 sm:py-12'>
			<div className='px-6 sm:px-10 text-center text-gray-200'>
				<h2 className='text-2xl sm:text-3xl font-bold colorgold mb-4'>
					{t('title')}
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
					{steps.map((step) => (
						<div
							key={step.id}
							className='rounded-lg p-6 text-center bg-blur w-full max-w-[300px] min-h-[260px] flex flex-col items-center justify-between hover:shadow-lg transition'
						>
							<Image
								src={step.image}
								alt={`Step ${step.id}`}
								width={500}
								height={100}
								className='mb-4 rounded-xl object-contain'
							/>
							<h3 className='font-semibold text-lg colorgold mb-2'>
								{step.title}
							</h3>
							<p className='text-sm text-gray-400'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default HowToStart
