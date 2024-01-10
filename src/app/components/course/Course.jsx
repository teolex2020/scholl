'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import {
	CheckIcon,
	ChevronDoubleDownIcon,
	FireIcon,
	AcademicCapIcon,
} from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import Cart from './Cart'
import Lector from './Lector'

import { useRouter } from '@/navigation'

const listStart = [
	{
		title: 'intro1',
	},
	{
		title: 'intro2',
	},
	{
		title: 'intro3',
	},
	{
		title: 'intro4',
	},
]

const ListItem = ({ title }) => (
	<div className='flex gap-5 items-center'>
		<div>
			{' '}
			<CheckIcon className='h-6 w-6 text-green-500' />
		</div>

		<div className='text-start  text-lg'>{title}</div>
	</div>
)

const Accordion = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className=' flex gap-5 items-start flex-col text-left cursor-pointer  z-10'>
			<div className=' flex gap-3 ' onClick={toggleOpen}>
				<div>
					<ChevronDoubleDownIcon
						className={`h-6 w-6 text-green-500  ${
							isOpen
								? 'rotate-180 transition duration-700 ease-in-out'
								: 'rotate-0 transition duration-700 ease-in-out'
						}`}
					/>
				</div>
				<div className='text-lg'>{title}</div>
			</div>
			<div
				className={` text-base
 ${
		isOpen
			? 'h-fit transition duration-700 ease-in-out'
			: 'h-0 transition duration-700 ease-in-out'
 } overflow-hidden`}
			>
				{isOpen && children}
			</div>
		</div>
	)
}

const blockAnimationlefth = {
	hidden: {
		// x: -1000,

		opacity: 0,
		scale: 0,
	},
	visible: (custom) => ({
		// x: 0,

		opacity: 1,
		scale: 1,
		transition: {
			// delay: custom * 0.2,
			duration: 0.8,
			ease: [0.075, 0.82, 0.165, 1],
			damping: 7,
			stiffness: 30,
			restDelta: 0.001,
		},
	}),
	exit: {
		scale: 0,
		// x: -500,
		opacity: 0,
	},
}
const blockAnimationright = {
	hidden: {
		// x: 100,

		opacity: 0,
		scale: 0,
	},
	visible: (custom) => ({
		// x: 0,

		opacity: 1,
		scale: 1,
		transition: {
			// delay: custom * 0.2,
			duration: 0.8,
			ease: [0.075, 0.82, 0.165, 1],
			damping: 7,
			stiffness: 30,
			restDelta: 0.001,
		},
	}),
	exit: {
		scale: 0,
		// x: 100,
		opacity: 0,
	},
}

const Course = () => {
	const router = useRouter()
	const t = useTranslations('Course')

	return (
		<AnimatePresence>
			<motion.div className='container mx-auto mb-4 p-4  rounded flex flex-col gap-1 '>
				<div className='w-full text-center text-xs text-zinc-500 py-2'>
					<p>{t('there')}</p>
				</div>
				<div className='mb-4 flex bg-blur flex-col-reverse lg:flex-row rounded-md'>
					<div className='text-xl lg:text-3xl flex-1  flex items-center justify-center p-10 flex-col'>
						<h2 className='text-left font-semibold'>{t('title')}</h2>
						<div className='skewed-section mt-10 '>
							<div className='bg-white  text-black  rounded-sm flex items-center justify-center'>
								<p className='text-sm text-left p-2 font-semibold  '>
									{t('descriptions')}
								</p>
							</div>
						</div>
						<div className='text-sm pt-5 w-full text-start '>
							<div className='flex items-center gap-3 relative group cursor-pointer w-fit'>
								<div className='hidden group-hover:block duration-300 fixed  bottom-0 left-0 right-0 bg-[#12181d]  p-10 border rounded-md lg:text-base z-50 max-w-3xl'>
									<Lector />
								</div>
								<div>
									<AcademicCapIcon className='h-6 w-6 text-green-500' />
								</div>
								{t('lectorname')}
								<span className='uppercase underline cursor-pointer '>
									{t('lector')}
								</span>
							</div>
						</div>
						<div>
							<button
								className=' mt-10 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-lg lg:text-2xl px-10'
								onClick={() => router.push('/')}
							>
								{t('button')}
							</button>
						</div>
					</div>
					<div className='flex-2 '>
						<div className='w-80 h-64 mx-auto lg:w-[500px] lg:h-80 flex justify-center relative mt-10 '>
							<div className='absolute  bg-blue-400 w-96 h-full blur-3xl rounded-full opacity-[20%]'></div>

							<Image
								src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742114/course_um7hml.png'
								fill
								sizes='(min-width: 808px) 50vw, 100vw'
								alt='course'
								className='rounded-full, object-cover'
								priority
							/>
						</div>
					</div>
				</div>
				<motion.div
					custom={1}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationlefth}
					className='border p-2 lg:text-xl border-zinc-500/50 my-3 rounded-md bg-blur'
				>
					<div className='space-y-3'>
						<p className='text-2xl font-semibold'>{t('aftercourse')}</p>
						{listStart.map((item, index) => (
							<ListItem key={index} title={t(item.title)} />
						))}
					</div>
				</motion.div>
				<motion.div
					custom={2}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationright}
					className='flex flex-col lg:flex-row'
				>
					<div className='flex flex-col lg:text-xl  gap-3 w-full mx-auto mt-10 text-start flex-1 '>
						<div>
							<p className='text-2xl mb-7'> {t('courseprogram')}:</p>
						</div>
						<Accordion title={`${t('Introduction')}`}></Accordion>
						<Accordion title={`${t('Deconstruction')}`}>
							<ul className='text-left flex flex-col gap-3'>
								<li>{t('intro5')}</li>
								<li>{t('intro6')}</li>
								<li>{t('intro7')}</li>
								<li>{t('intro8')}</li>
								<li>{t('intro9')}</li>
								<li>{t('intro10')}</li>
								<li>{t('intro11')}</li>
							</ul>
						</Accordion>
						<Accordion title={`${t('Reconstruction')}`}>
							<ul className='text-left flex flex-col gap-3'>
								<li>{t('intro12')}</li>
								<li>{t('intro13')}</li>
								<li>{t('intro14')}</li>
								<li>{t('intro15')}</li>
								<li>{t('intro16')}</li>
								<li>{t('intro17')}</li>
								<li>{t('intro18')}</li>
								<li>{t('intro19')}</li>
							</ul>
						</Accordion>
						<Accordion title={`${t('Conclusion')}`}></Accordion>
					</div>
					<Cart />
				</motion.div>
				<hr className='opacity-10 my-5' />
				<motion.div
					custom={3}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationlefth}
					className='flex flex-col items-center gap-6'
				>
					<div className='text-2xl'>{t('Certificat')}</div>
					<div className='w-[266px] h-96 relative'>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742111/certificat_piyuo8.png'
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							alt='certificate'
							className='object-cover'
							priority
						/>
					</div>
				</motion.div>
				{/* <ImageCarousel /> */}
				<hr className='opacity-10 my-5' />
				<motion.div
					custom={4}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationright}
					className='mb-14 lg:text-xl flex flex-col '
				>
					<div>
						<div className='text-2xl mb-5'>{t('Questions')}</div>
					</div>
					<Accordion title={`${t('Quiz1')}`}>
						<ul className='text-left flex flex-col gap-3 py-5'>
							<li className='flex gap-3'>
								<span>
									<FireIcon className='h-5 w-5 text-red-500' />
								</span>
								{t('answer1')}
							</li>
						</ul>
					</Accordion>
					<Accordion title={`${t('Quiz2')}`}>
						<ul className='text-left flex flex-col gap-3 py-5'>
							<li className='flex gap-3'>
								<span>
									<FireIcon className='h-5 w-5 text-red-500' />
								</span>
								{t('answer2')}
							</li>
						</ul>
					</Accordion>
					<Accordion title={`${t('Quiz3')}`}>
						<ul className='text-left flex flex-col gap-3 py-5'>
							<li className='flex gap-3'>
								<span>
									<FireIcon className='h-5 w-5 text-red-500' />
								</span>
								{t('answer3')}
							</li>
						</ul>
					</Accordion>
				</motion.div>
				<hr className='opacity-10 my-5' />
			</motion.div>
		</AnimatePresence>
	)
}

export default Course
