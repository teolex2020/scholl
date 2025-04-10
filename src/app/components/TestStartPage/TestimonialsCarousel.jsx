'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
	{
		text: 'Це найцікавіші лекції, які я коли-небудь слухав. Ідеальне поєднання історії, технологій і філософії.',
		author: 'Олена М.',
		location: 'Київ, Україна',
	},
	{
		text: 'BortnikSchool дає не просто знання — це справжній інтелектуальний досвід.',
		author: 'Андрій К.',
		location: 'Львів, Україна',
	},
	{
		text: 'Штучний інтелект і гуманітаристика? Я в захваті! Дуже рекомендую всім друзям.',
		author: 'Марія С.',
		location: 'Торонто, Канада',
	},
]

const TestimonialsCarousel = () => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	return (
		<section className='max-w-[1400px] mx-auto sm:mt-14 px-4 sm:px-6'>
			<div className='bg-menublur rounded-md px-6 py-10 text-center text-gray-200'>
				<h2 className='text-2xl sm:text-3xl font-bold colorgold mb-6'>
					Що кажуть наші студенти?
				</h2>

				<div className='relative h-52 flex items-center justify-center overflow-hidden'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={index}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.6 }}
							className='max-w-xl mx-auto'
						>
							<p className='text-lg sm:text-xl italic mb-4'>
								“{testimonials[index].text}”
							</p>
							<p className='text-[#e2a550] font-semibold'>
								— {testimonials[index].author}, {testimonials[index].location}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}

export default TestimonialsCarousel
