'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import bannerImage from '../../../../public/assets/l.webp'

const HeroBanner = () => {
	return (
		<section className='w-full max-w-[1400px] mx-auto sm:mt-8  sm:h-[400px] lg:h-[600px] rounded-xl overflow-hidden relative  bg-blur'>
			<div className='flex flex-col lg:flex-row h-full justify-around '>
				{/* Градієнтний фон позаду тексту */}
				<div className='absolute inset-0 bg-gradient-to-tr from-[#12181d00] via-[#10151a] to-[#141414] z-0 pointer-events-none ' />

				{/* Ліва частина — текст */}
				<div className='flex flex-col justify-center items-start text-left px-5  py-6 sm:py-10 lg:w-1/2 z-10 gap-5 '>
					<div className='sm:absolute top-4 left-4 sm:top-6 sm:left-8 z-20   '>
						<motion.p
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='font-bold text-xl sm:text-2xl tracking-widest drop-shadow bg-blur p-2 rounded-tl-2xl cursor-pointer'
						>
							BortnikSchool
						</motion.p>
					</div>

					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-xl sm:text-6xl font-bold text-[#e0a603] max-w-xl leading-tight '
						style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
					>
						Навчайся з лідерами
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='text-gray-200 text-lg  max-w-md pb-10'
					>
						Онлайн-курси, лекції та тренінги в зручному форматі
					</motion.p>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='px-6 py-3 border border-[#e0a603] rounded-xl text-[#e0a603] hover:bg-[#e0a603] hover:text-black transition font-semibold hidden sm:block hover:shadow-lg'
					>
						Переглянути курси
					</motion.button>
				</div>

				{/* Права частина — ілюстрація */}
				<motion.div
					className='relative lg:w-1/3 h-64 sm:h-96 lg:h-full shadow-lg  '
					initial={{ opacity: 0, scale: 1.1 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1 }}
				>
					<Image
						src={bannerImage}
						alt='Hero image'
						fill
						sizes='(max-width: 1024px) 100vw, 50vw'
						className='object-contain drop-shadow-[0_0_3px_#e2a550]'
						priority
					/>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroBanner
