'use client'
import {
	FireIcon,
	AcademicCapIcon,
	CalendarIcon,
	ClockIcon,
	LanguageIcon,
} from '@heroicons/react/24/solid'
import { useTranslations, useLocale } from 'next-intl'
import Cart from './Cart'
import { useParams } from 'next/navigation'
import { useRouter } from '@/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import Accordion from './Accordion'
import { Gentium_Book_Plus } from 'next/font/google'
import { coursesua } from './language/lecturesua'
import { coursesen } from './language/lecturesen'
import { coursesru } from './language/lecturesru'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Course = () => {
	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('Course')
	const dispatch = useDispatch()
	const locale = useLocale()

	const params = useParams()

	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,
	}

	const currentCourses = courses[locale] || coursesua

	const data = currentCourses.find((item) => item.id === params.slug)

	const dataOrder = (e) => {
		if (!authUser) {
			router.push('/login')
		}
		dispatch(OrderPrice(data.price))
		dispatch(OrderTitle(data.title))
		dispatch(OrderId(data.id))
		router.push('/payment')
	}

	return (
		<div className=' lg:container mx-auto mb-4 p-4  rounded flex flex-col gap-1 relative '>
			<div className=' text-center text-xs text-zinc-500 py-2 '>
				<p>{t('there')}</p>
			</div>
			<div className='flex flex-col-reverse md:flex-row gap-10 '>
				<div>
					<div className='mb-4 flex bg-blur flex-col-reverse lg:flex-row rounded-md min-h-80 '>
						<div className='text-xl lg:text-3xl flex-1  flex items-start justify-start md:p-10 p-3 flex-col'>
							<h2 className='text-left font-semibold'>{data?.title}</h2>

							<div className=' mt-5  rounded-sm flex items-center justify-center'>
								<p
									className={`text-lg text-left  font-semibold  ${gentium.className} `}
								>
									{data.descriptions}
								</p>
							</div>

							<div className='text-sm pt-5 w-full text-start mt-5 '>
								<div className='flex flex-col md:flex-row md:space-x-5'>
									{' '}
									<div className='flex  relative    justify-start h-7   gap-3'>
										<AcademicCapIcon className='h-6 w-6 text-green-500' />

										{t('lectorname')}

										<span className='uppercase underline  '>{data.lector}</span>
									</div>
									<div className='flex  relative    justify-start h-7   gap-3'>
										<LanguageIcon className='h-6 w-6 text-green-500' />

										{t('language')}
										<span className='uppercase underline  '>
											{data.language}
										</span>
									</div>
								</div>

								<div className='text-sm text-zinc-300 flex gap-2 py-3 relative cursor-pointer w-fit '>
									<CalendarIcon className='w-5 h-5 text-green-500' />
									<span>{data.datastart} </span>

									<ClockIcon className='w-5 h-5' />
									<span className='uppercase'>19.00</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Cart
						dataOrder={dataOrder}
						price={data.price}
						alltime={data.alltime}
						image={data.image}
					/>
				</div>
			</div>

			<hr className='opacity-10 my-5' />
			<div className='mb-14 lg:text-xl flex flex-col bg-blur rounded-lg p-2 gap-2'>
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
			</div>
			<hr className='opacity-10 my-5' />
		</div>
	)
}

export default Course
