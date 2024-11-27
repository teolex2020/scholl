'use client'
import Link from 'next/link'
import Image from 'next/image'
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
import certificat from '../../../../public/assets/certificat.webp'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import ListItem from './ListItem'
import Accordion from './Accordion'
import List from './List'
import { Gentium_Book_Plus } from 'next/font/google'
import { coursesua } from './language/coursesua'
import { coursesen } from './language/coursesen'
import { coursesru } from './language/coursesru'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Course = () => {

	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('Course')
	const m = useTranslations('Meeting')
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

	if (!data) {
		return (
			<div className='flex flex-col justify-center items-center w-full h-full p-20'>
				<div>
					<h2>Page Not Found....</h2>
				</div>

				<div className='text-blue-500'>
					<Link href='/'>Return Home</Link>
				</div>
			</div>
		)
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
							<h2 className='text-left font-semibold'>{data.title}</h2>

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

								<div
									className='text-sm text-zinc-300 flex gap-2 py-3 relative cursor-pointer w-fit '
									// onMouseEnter={() => setIsData(true)}
									// onMouseLeave={() => setIsData(false)}
								>
									<CalendarIcon className='w-5 h-5 text-green-500' />
									<span>{data.datastart} </span>
									<span>-</span>
									<span>{data.dataend} </span>
									<ClockIcon className='w-5 h-5' />
									<span className='uppercase'>19.00</span>
								</div>
							</div>
							<div className='w-full text-center text-lg text-red-600 font-semibold pt-2'>
								{m('link')}.
							</div>
						</div>
					</div>
					<div className=' p-2 lg:text-xl  my-3 rounded-md bg-blur min-h-[255px]'>
						<div className='space-y-3'>
							<p className='text-xl font-semibold'>{t('aftercourse')}:</p>
							{data.conclusions.map((item, index) => (
								<ListItem key={index} title={item.title} />
							))}
						</div>
					</div>
				</div>
				<div>
					<Cart
						dataOrder={dataOrder}
						price={data.price}
						alltime={data.alltime}
						image={data.image}
						active={data.active}
					/>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row'>
				<div className='flex flex-col lg:text-xl  gap-3 w-full mx-auto md:mt-5 text-start flex-1 '>
					<div>
						<p className='text-xl font-semibold md:mb-3'>
							{' '}
							{t('courseprogram')}:
						</p>
					</div>
					{data.courseprogram.map((item, index) => (
						<Accordion key={index} title={item.title}>
							{item?.lectures?.map((lecture, index) => (
								<List key={index} title={lecture.title} />
							))}
						</Accordion>
					))}
				</div>
			</div>
			<hr className='opacity-10 my-5' />
			<div className='flex flex-col items-center gap-6'>
				<div className='text-2xl'>{t('Certificat')}*</div>
				<div className='w-96 h-64 relative bg-blur'>
					<Image
						src={certificat}
						fill
						sizes='(min-width: 808px) 50vw, 100vw'
						alt='certificate'
						className='object-cover'
						priority
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
