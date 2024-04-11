'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import {
	FireIcon,
	AcademicCapIcon,
	CalendarIcon,
	ClockIcon,
} from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import Cart from './Cart'

import { useRouter } from '@/navigation'
import course from '../../../../public/assets/course.webp'
import certificat from '../../../../public/assets/certificat.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import ListItem from './ListItem'
import Accordion from './Accordion'

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

	const [isData, setIsData] = useState(false)
	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('Course')
	const dispatch = useDispatch()

	const dataOrder = (e) => {
		if (!authUser) {
			router.push('/login')
		}
		dispatch(OrderPrice(4999))
		dispatch(OrderTitle(t('title')))
		dispatch(OrderId(20241))
		router.push('/payment')
	}

	return (
		<AnimatePresence>
			<motion.div className='container mx-auto mb-4 p-4  rounded flex flex-col gap-1 '>
				<div className='w-full text-center text-xs text-zinc-500 py-2'>
					<p>{t('there')}</p>
				</div>
				<motion.div
					custom={1}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationlefth}
					className='mb-4 flex bg-blur flex-col-reverse lg:flex-row rounded-md'
				>
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
							<div className='flex  relative    justify-start h-7   gap-3'>
								<AcademicCapIcon className='h-6 w-6 text-green-500' />

								{t('lectorname')}
								<span className='uppercase underline  '>{t('lector')}</span>
							</div>
							<div
								className='text-sm text-zinc-300 flex gap-3 py-3 relative cursor-pointer w-fit'
								onMouseEnter={() => setIsData(true)}
								onMouseLeave={() => setIsData(false)}
							>
								<CalendarIcon className='w-5 h-5 text-green-500' />
								<span>02.09.2024 -</span>
								<span className='uppercase'>21.10.2024</span>
								<ClockIcon className='w-5 h-5' />
								<span className='uppercase'>19.00</span>
								<div
									className={`${
										isData ? 'scale-100' : 'scale-0'
									} duration-500  bg-[#12181d]  border rounded-md text-sm z-50 max-w-3xl absolute bottom-0-0 left-0 p-2 flex `}
								>
									<p>
										2.09.2024, <br /> 4.09.2024,
										<br />
										9.09.2024,
										<br />
										11.09.2024,
										<br />
										16.09.2024,
										<br />
										18.09.2024,
										<br /> 23.09.2024,
										<br /> 25.09.2024, <br />
										30.09.2024
									</p>
									<p>
										2.10.2024,
										<br />
										7.10.2024,
										<br />
										9.10.2024,
										<br />
										14.10.2024,
										<br /> 16.10.2024,
										<br /> 21.10.2024
									</p>
								</div>
							</div>
						</div>
						<div>
							<button
								className=' mt-10 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:scale-105 bg-blur z-10  font-semibold lg:text-2xl px-10 w-48'
								onClick={() => dataOrder()}
							>
								{t('button')}
							</button>
						</div>
					</div>
					<div className='flex-1 '>
						<div className='w-72 h-64 mx-auto lg:w-[400px] lg:h-80 flex justify-center relative mt-10 '>
							<div className='absolute  bg-blue-400/30 w-96 h-full blur-3xl rounded-full'></div>

							<Image
								src={course}
								fill
								sizes='(min-width: 808px) 50vw, 100vw'
								alt='course'
								className='rounded-full, object-cover opacity-80'
								priority
							/>
						</div>
					</div>
				</motion.div>
				<motion.div
					custom={2}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationlefth}
					className=' p-2 lg:text-xl  my-3 rounded-md bg-blur'
				>
					<div className='space-y-3'>
						<p className='text-2xl font-semibold'>{t('aftercourse')}</p>
						{listStart.map((item, index) => (
							<ListItem key={index} title={t(item.title)} />
						))}
					</div>
				</motion.div>
				<motion.div
					custom={3}
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
					<Cart dataOrder={dataOrder} />
				</motion.div>
				<hr className='opacity-10 my-5' />
				<motion.div
					custom={4}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationlefth}
					className='flex flex-col items-center gap-6'
				>
					<div className='text-2xl'>{t('Certificat')}</div>
					<div className='w-[266px] h-96 relative bg-blur'>
						<Image
							src={certificat}
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
					custom={5}
					initial='hidden'
					whileInView='visible'
					viewport={{ amount: 0.2, once: true }}
					variants={blockAnimationright}
					className='mb-14 lg:text-xl flex flex-col bg-blur rounded-lg p-2'
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
