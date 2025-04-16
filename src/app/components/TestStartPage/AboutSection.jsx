'use client'
import {
	LightBulbIcon,
	ScaleIcon,
	CpuChipIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

const AboutUsSection = () => {
	const t = useTranslations('About')

	return (
		<section className='max-w-[1400px] mx-auto mb-16 sm:mt-10 rounded-xl bg-blur'>
			<div className='p-6 sm:p-10 text-center text-gray-200'>
				<h2 className='text-2xl sm:text-3xl font-bold colorgold mb-4'>
					{t('title')}
				</h2>
				<p className='max-w-3xl mx-auto text-base sm:text-lg mb-8'>
					<span className='colorgold'>BortnikSchool</span> — {t('description')}
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6'>
					{/* Експертність */}
					<div className='flex flex-col items-center gap-3'>
						<LightBulbIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>
							{t('expertise.title')}
						</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							{t('expertise.text')}
						</p>
					</div>

					{/* Гнучкість */}
					<div className='flex flex-col items-center gap-3'>
						<ScaleIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>
							{t('flexibility.title')}
						</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							{t('flexibility.text')}
						</p>
					</div>

					{/* AI-підтримка */}
					<div className='flex flex-col items-center gap-3'>
						<CpuChipIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>
							{t('aiSupport.title')}
						</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							{t('aiSupport.text')}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUsSection
