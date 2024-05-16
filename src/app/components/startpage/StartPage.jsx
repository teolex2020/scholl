'use client'
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ButtonStartPage from '../ui/ButtonStartPage'
import Image from 'next/image'
import { Gentium_Book_Plus } from 'next/font/google'
import startimage from '../../../../public/assets/bg.webp'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const StartPage = ({ title, name, descriptions, button, info }) => {
	return (
		<AnimatePresence>
			<motion.div className='container mx-auto elem bg-blur mb-10 py-5  lg:pb-24 mt-5 lg:mt-14 2xl:mt-24  relative rounded-xl max-w-[1346px]  '>
				<div className='flex justify-around flex-col lg:flex-row items-center lg:gap-48 '>
					<motion.div
						custom={1}
						initial={{ scale: 0 }}
						animate={{
							scale: 1,
							transition: {
								// delay: custom * 0.2,
								duration: 0.8,
								ease: [0.075, 0.82, 0.165, 1],
								damping: 10,
								stiffness: 300,
								restDelta: 0.001,
							},
						}}
						exit={{ scale: 0 }}
						className=' flex lg:flex-1 h-48 lg:h-[450px] w-96  relative justify-center '
					>
						<div className='absolute ml-28  bg-blue-300 w-96 h-full blur-3xl rounded-full opacity-[15%]  '></div>
						<div className='absolute bg-green-300/30 w-48 h-48 ml-32 blur-3xl rounded-full opacity-[25%] '></div>

						<Image
							src={startimage}
							alt='trees '
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							className='object-cover tilt-image '
							priority
						/>
					</motion.div>
					<motion.div
						custom={2}
						initial={{ scale: 0 }}
						animate={{
							scale: 1,
							transition: {
								// delay: custom * 0.2,
								duration: 0.9,
								ease: [0.075, 0.82, 0.165, 1],
								damping: 7,
								stiffness: 30,
								restDelta: 0.001,
							},
						}}
						className='flex flex-1 h-full  flex-col px-5 text-center lg:text-left  gap-5 '
					>
						<div className={` ${gentium.className}   `}>
							<p className='text-2xl'>{title}</p>{' '}
							<p className='colorgold text-5xl '> {name}</p>
						</div>
						{descriptions}
						<ButtonStartPage button={button} />
						<div className='text-[12px]'>*{info}</div>
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default StartPage
