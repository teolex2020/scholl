'use client'
import { LightBulbIcon, ScaleIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const AboutUsSection = () => {
	return (
		<section className='max-w-[1400px] mx-auto mt-16 rounded-xl bg-blur'>
			<div className='  p-6 sm:p-10 text-center text-gray-200'>
				<h2 className='text-2xl sm:text-3xl font-bold colorgold mb-4'>
					Чому саме BortnikSchool?
				</h2>
				<p className='max-w-3xl mx-auto text-base sm:text-lg mb-8'>
					<span className='colorgold'>BortnikSchool</span> — це унікальне
					поєднання класичної освіти з сучасними технологіями. Наші викладачі —
					експерти-практики, що працюють на перетині гуманітарних наук і
					штучного інтелекту.
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6'>
					{/* 1. Експертність */}
					<div className='flex flex-col items-center gap-3'>
						<LightBulbIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>Експертність</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							Наші лектори — професіонали з багаторічним досвідом у своїй
							галузі.
						</p>
					</div>

					{/* 2. Гнучкість */}
					<div className='flex flex-col items-center gap-3'>
						<ScaleIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>Гнучкість</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							Вчися у зручному темпі онлайн — де і коли зручно саме тобі.
						</p>
					</div>

					{/* 3. AI-підтримка */}
					<div className='flex flex-col items-center gap-3'>
						<CpuChipIcon className='h-10 w-10 text-[#e2a550]' />
						<h3 className='font-semibold text-lg colorgold'>AI-підтримка</h3>
						<p className='text-sm text-gray-400 max-w-[220px]'>
							Ми впроваджуємо штучний інтелект для персоналізованого навчання.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUsSection
