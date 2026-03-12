'use client'
import Link from 'next/link'
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
// import certificat from '../../../../public/assets/certificat.webp'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import ListItem from './ListItem'
import Accordion from './Accordion'
import List from './List'
import { coursesua } from './language/coursesua'
import { coursesen } from './language/coursesen'
import { coursesru } from './language/coursesru'

const Course = () => {
	const { authUser } = useSelector((state) => state.counter)
	const router = useRouter()
	const t = useTranslations('Course')

	const dispatch = useDispatch()
	const locale = useLocale()
	const localizedMeta = {
		uk: { start: 'Старт' },
		ru: { start: 'Старт' },
		en: { start: 'Start' },
	}
	const metaCopy = localizedMeta[locale] || localizedMeta.uk

	const params = useParams()

	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,
	}

	const currentCourses = courses[locale] || coursesua

	const data = currentCourses.find((item) => item.id === params.slug)

	const paragraphs = (data?.descriptions ?? '')
		.trim()
		.split(/\n+/)
		.map((item) => item.trim())
		.filter(Boolean)
	const introParagraphs = paragraphs.slice(0, 2)
	const strategyParagraph =
		paragraphs.find((item) => item.includes('Стратег')) ||
		paragraphs.find((item) => item.includes('Стратег')) ||
		paragraphs[2] ||
		''
	const bulletHighlights = paragraphs
		.filter((item) => item.includes(':'))
		.slice(0, 3)
		.map((item) => {
			const [label, ...rest] = item.split(':')
			return {
				label: `${label.trim()}:`,
				text: rest.join(':').trim(),
			}
		})

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
			<div className='flex flex-col md:flex-row gap-6 xl:gap-10 items-start'>
				<div className='w-full flex-1 min-w-0'>
					<div className='mb-4 flex bg-blur flex-col-reverse lg:flex-row rounded-md min-h-80 border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
						<div className='w-full flex-1 flex items-start justify-start md:p-10 p-4 flex-col'>
							<div className='flex flex-wrap gap-2 text-[11px] md:text-sm mb-3 md:mb-4'>
								<span className='rounded-full border border-[#e2a550]/40 bg-[#e2a550]/10 px-3 py-1 text-[#f3c06b]'>
									{data.course}
								</span>
								<span className='rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300'>
									{data.datastart} - {data.dataend}
								</span>
								<span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300'>
									{data.time || '19.00'}
								</span>
							</div>
							<h2 className='w-full max-w-4xl text-left font-semibold leading-tight text-[2rem] md:text-4xl'>
								{data.title}
							</h2>
							<p className='mt-3 md:mt-4 w-full max-w-4xl text-left text-[15px] md:text-xl leading-7 md:leading-relaxed text-zinc-200/90'>
								{introParagraphs[0]}
							</p>
							{introParagraphs[1] && (
								<p className='mt-2 md:mt-3 w-full max-w-4xl text-left text-sm md:text-lg leading-6 md:leading-relaxed text-zinc-300'>
									{introParagraphs[1]}
								</p>
							)}

							<div className='mt-5 md:mt-6 grid w-full max-w-4xl gap-2 md:gap-3 md:grid-cols-3'>
								{bulletHighlights.map((item, index) => (
									<div
										key={`${item.label}-${index}`}
										className='rounded-2xl border border-white/8 bg-white/[0.03] p-3 md:p-4'
									>
										<p className='text-xs md:text-sm font-semibold uppercase tracking-[0.08em] text-[#f0b356]'>
											{item.label}
										</p>
										<p className='mt-1.5 md:mt-2 text-[13px] md:text-base leading-6 md:leading-relaxed text-zinc-200'>
											{item.text}
										</p>
									</div>
								))}
							</div>

							{strategyParagraph && (
								<div className='mt-4 md:mt-5 w-full max-w-4xl rounded-2xl border border-[#e2a550]/20 bg-[#e2a550]/[0.06] p-3 md:p-5'>
									<p className='text-left text-[13px] md:text-base leading-6 md:leading-relaxed text-zinc-100'>
										{strategyParagraph}
									</p>
								</div>
							)}

							<p className='text-xs md:text-sm w-full py-3 md:py-4 text-[#e2a550]'>
								***{t('link')}***
							</p>
							<div className='mt-2 grid w-full max-w-4xl gap-2 md:gap-3 md:grid-cols-3'>
								<div className='rounded-2xl border border-white/8 bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<AcademicCapIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{t('lectorname')}</span>
									</div>
									<p className='mt-2 font-semibold uppercase'>{data.lector}</p>
								</div>
								<div className='rounded-2xl border border-white/8 bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<LanguageIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{t('language')}</span>
									</div>
									<p className='mt-2 font-semibold uppercase'>{data.language}</p>
								</div>
								<div className='rounded-2xl border border-white/8 bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<CalendarIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{metaCopy.start}</span>
									</div>
									<p className='mt-2 font-semibold'>
										{data.datastart} - {data.dataend}
									</p>
									<div className='mt-2 flex items-center gap-2 text-zinc-400'>
										<ClockIcon className='w-4 h-4' />
										<span className='uppercase'>{data.time || '19.00'}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='p-4 lg:text-lg my-3 rounded-md bg-blur min-h-[255px] border border-white/5'>
						<div className='space-y-3'>
							<p className='text-xl font-semibold'>{t('aftercourse')}:</p>
							{data.conclusions.map((item, index) => (
								<ListItem key={index} title={item.title} />
							))}
						</div>
					</div>
				</div>
				<div className='w-full md:w-auto lg:sticky lg:top-24'>
					<Cart
						dataOrder={dataOrder}
						price={data.price}
						alltime={data.alltime}
						image={data.image}
						active={data.active}
						datastart={data.datastart}
						dataend={data.dataend}
						language={data.language}
					/>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row'>
				<div className='flex flex-col lg:text-base  gap-3 w-full mx-auto md:mt-5 text-start flex-1 '>
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
			<div className='flex justify-center'>
				<div className='sm:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg '>
					<iframe
						className='w-full h-full' // займає всю площу контейнера
						src={`https://www.youtube.com/embed/${data.youtube}`}
						title='Promo Video'
						style={{ border: 0 }}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					/>
				</div>
			</div>
			<hr className='opacity-10 my-5' />
			<div className='mb-14 lg:text-xl flex flex-col bg-blur rounded-lg p-2 gap-2'>
				<div>
					<div className='text-lg mb-5'>{t('Questions')}</div>
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
