'use client'
import {
	FireIcon,
	AcademicCapIcon,
	CalendarIcon,
	ClockIcon,
	LanguageIcon,
	HandRaisedIcon,
	CheckCircleIcon,
	LockClosedIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid'
import { useTranslations, useLocale } from 'next-intl'
import Cart from './Cart'
import { useParams } from 'next/navigation'
import { useRouter } from '@/navigation'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { OrderTitle, OrderPrice, OrderId } from '@/store/features/counterSlice'
import Accordion from './Accordion'
import { coursesua } from './language/meetua'
import { coursesen } from './language/meeten'
import { coursesru } from './language/meetru'

const localizedCopy = {
	ua: {
		eyebrow: 'Закрита онлайн-зустріч',
		noRecord: 'Без запису',
		liveQa: 'Живі відповіді на питання',
		limited: 'Кількість місць обмежена',
		inside: 'Що буде всередині',
		description: 'Про зустріч',
		joinNow: 'Забронювати участь',
		closed: 'Реєстрацію закрито',
		pricePrefix: 'Участь',
		whyTitle: 'Для тих, кому потрібна не мотивація, а тверезий план дій.',
		whyText:
			'Закритий формат, прямий діалог і практичні питання про майбутнє, ризики та особисті рішення.',
	},
	uk: {
		eyebrow: 'Закрита онлайн-зустріч',
		noRecord: 'Без запису',
		liveQa: 'Живі відповіді на питання',
		limited: 'Кількість місць обмежена',
		inside: 'Що буде всередині',
		description: 'Про зустріч',
		joinNow: 'Забронювати участь',
		closed: 'Реєстрацію закрито',
		pricePrefix: 'Участь',
		whyTitle: 'Для тих, кому потрібна не мотивація, а тверезий план дій.',
		whyText:
			'Закритий формат, прямий діалог і практичні питання про майбутнє, ризики та особисті рішення.',
	},
	ru: {
		eyebrow: 'Закрытая онлайн-встреча',
		noRecord: 'Без записи',
		liveQa: 'Живые ответы на вопросы',
		limited: 'Количество мест ограничено',
		inside: 'Что будет внутри',
		description: 'О встрече',
		joinNow: 'Забронировать участие',
		closed: 'Регистрация закрыта',
		pricePrefix: 'Участие',
		whyTitle: 'Для тех, кому нужна не мотивация, а трезвый план действий.',
		whyText:
			'Закрытый формат, прямой диалог и практические вопросы о будущем, рисках и личных решениях.',
	},
	en: {
		eyebrow: 'Closed online meeting',
		noRecord: 'No recording',
		liveQa: 'Live Q&A',
		limited: 'Limited seats',
		inside: 'What you get inside',
		description: 'About the meeting',
		joinNow: 'Reserve your seat',
		closed: 'Registration closed',
		pricePrefix: 'Seat',
		whyTitle: 'For people who need a clear action plan, not motivation.',
		whyText:
			'A closed format, direct dialogue, and practical questions about the future, risks, and personal decisions.',
	},
}

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
	const copy = localizedCopy[locale] || localizedCopy.ua
	const descriptionParagraphs = (data?.descriptions ?? '')
		.trim()
		.split(/\n+/)
		.map((item) => item.trim())
		.filter(Boolean)
	const topicItems = descriptionParagraphs
		.filter((item) => /^[•\-–]|^вЂў/.test(item))
		.map((item) => item.replace(/^(•|вЂў|-|–)\s*/, '').trim())
	const introParagraphs = descriptionParagraphs.filter(
		(item) => !/^[•\-–]|^вЂў/.test(item)
	)
	const visibleTopics = topicItems.slice(0, 6)
	const heroIntro = introParagraphs.slice(0, 2)
	const detailParagraphs = introParagraphs.slice(2)

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
					<div className='mb-4 overflow-hidden rounded-2xl border border-[#e2a550]/15 bg-[#111820] shadow-[0_24px_80px_rgba(0,0,0,0.42)]'>
						<div className='relative w-full flex-1 flex items-start justify-start md:p-10 p-4 flex-col'>
							<div className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#e2a550]/10 to-transparent'></div>
							<div className='pointer-events-none absolute bottom-0 right-0 h-56 w-56 bg-[#e2a550]/[0.04] blur-3xl'></div>

							<div className='flex flex-wrap gap-2 text-[11px] md:text-sm mb-3 md:mb-4'>
								<span className='rounded-full border border-[#e2a550]/40 bg-[#e2a550]/10 px-3 py-1 text-[#f3c06b]'>
									{copy.eyebrow}
								</span>
								<span className='rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300'>
									{data.datastart} • {data.time}
								</span>
								<span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300'>
									{copy.noRecord}
								</span>
							</div>
							<h2 className='relative z-10 w-full max-w-4xl text-left font-semibold leading-tight text-[1.65rem] sm:text-3xl md:text-4xl'>
								{data.title}
							</h2>

							<div className='relative z-10 mt-4 md:mt-5 w-full max-w-4xl space-y-3 text-left text-[15px] md:text-xl leading-7 md:leading-relaxed text-zinc-200/90'>
								{heroIntro.map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>

							<div className='relative z-10 mt-6 grid w-full max-w-4xl gap-3 md:grid-cols-3'>
								<div className='rounded-2xl border border-[#e2a550]/20 bg-[#e2a550]/[0.07] p-4'>
									<LockClosedIcon className='h-6 w-6 text-[#f0b356]' />
									<p className='mt-3 font-semibold text-white'>{copy.noRecord}</p>
									<p className='mt-1 text-sm leading-6 text-zinc-300'>{m('takeout')}.</p>
								</div>
								<div className='rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4'>
									<QuestionMarkCircleIcon className='h-6 w-6 text-emerald-300' />
									<p className='mt-3 font-semibold text-white'>{copy.liveQa}</p>
									<p className='mt-1 text-sm leading-6 text-zinc-300'>{copy.whyText}</p>
								</div>
								<div className='rounded-2xl border border-white/10 bg-white/[0.04] p-4'>
									<CheckCircleIcon className='h-6 w-6 text-green-400' />
									<p className='mt-3 font-semibold text-white'>{copy.limited}</p>
									<p className='mt-1 text-sm leading-6 text-zinc-300'>{copy.whyTitle}</p>
								</div>
							</div>

							<div className='relative z-10 mt-6 flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/[0.08] bg-black/15 p-4 sm:flex-row sm:items-center sm:justify-between'>
								<div>
									<p className='text-xs uppercase tracking-[0.14em] text-zinc-400'>{copy.pricePrefix}</p>
									<p className='mt-1 text-3xl font-semibold text-[#f0b356]'>{data.price} ₴</p>
								</div>
								{data.active ? (
									<button
										className='rounded-2xl bg-[#e2a550] px-6 py-3 text-lg font-semibold text-black shadow-[0_12px_30px_rgba(226,165,80,0.22)] transition hover:bg-[#f0b356]'
										onClick={() => dataOrder()}
									>
										{copy.joinNow}
									</button>
								) : (
									<button className='rounded-2xl border border-[#e2a550]/40 px-6 py-3 text-lg font-semibold text-[#e2a550] opacity-70'>
										{copy.closed}
									</button>
								)}
							</div>

							<div className='mt-2 grid w-full max-w-4xl gap-2 md:gap-3 md:grid-cols-2 xl:grid-cols-4'>
								<div className='rounded-2xl border border-white/[0.08] bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<AcademicCapIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{t('lectorname')}</span>
									</div>
									<p className='mt-2 font-semibold uppercase'>{data.lector}</p>
								</div>
								<div className='rounded-2xl border border-white/[0.08] bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<LanguageIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{t('language')}</span>
									</div>
									<p className='mt-2 font-semibold uppercase'>{data.language}</p>
								</div>
								<div className='rounded-2xl border border-white/[0.08] bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<HandRaisedIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{m('Moderator')}</span>
									</div>
									<p className='mt-2 font-semibold uppercase'>{data.Moderator}</p>
								</div>
								<div className='rounded-2xl border border-white/[0.08] bg-black/10 p-3 md:p-4 text-sm text-zinc-200'>
									<div className='flex items-center gap-3'>
										<CalendarIcon className='h-5 w-5 text-green-500' />
										<span className='text-zinc-400'>{data.datastart}</span>
									</div>
									<div className='mt-2 flex items-center gap-2 text-zinc-200'>
										<ClockIcon className='w-4 h-4 text-zinc-400' />
										<span className='font-semibold uppercase'>{data.time}</span>
									</div>
								</div>
							</div>

							<p className='relative z-10 text-xs md:text-sm w-full py-3 md:py-4 text-[#e2a550]'>
								***{m('link')}***
							</p>
						</div>
					</div>

					{visibleTopics.length > 0 && (
						<div className='mb-4 rounded-2xl border border-white/5 bg-blur p-4 md:p-6'>
							<div className='mb-4 flex items-center justify-between gap-3'>
								<p className='text-xl font-semibold md:text-2xl'>{copy.inside}</p>
								<span className='hidden rounded-full border border-[#e2a550]/25 bg-[#e2a550]/10 px-3 py-1 text-xs text-[#f0b356] sm:block'>
									{copy.liveQa}
								</span>
							</div>
							<div className='grid gap-3 md:grid-cols-2'>
								{visibleTopics.map((item, index) => (
									<div
										key={`${item}-${index}`}
										className='flex gap-3 rounded-2xl border border-white/[0.08] bg-black/10 p-3 text-sm leading-6 text-zinc-200 md:p-4 md:text-base'
									>
										<CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-emerald-400' />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{detailParagraphs.length > 0 && (
						<div className='mb-4 rounded-2xl border border-white/5 bg-blur p-4 md:p-6'>
							<p className='mb-3 text-xl font-semibold md:text-2xl'>{copy.description}</p>
							<div className='space-y-3 text-[15px] leading-7 text-zinc-300 md:text-lg md:leading-8'>
								{detailParagraphs.map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>
						</div>
					)}
				</div>

				<div className='w-full md:w-auto lg:sticky lg:top-24'>
					<Cart
						dataOrder={dataOrder}
						price={data?.price}
						alltime={data?.duration}
						image={data?.image}
						active={data?.active}
						donat={data?.donat}
						title={data?.title}
					/>
				</div>
			</div>

			<div className='fixed inset-x-0 bottom-0 z-40 border-t border-[#e2a550]/20 bg-[#0f151a]/95 p-3 shadow-[0_-16px_40px_rgba(0,0,0,0.4)] backdrop-blur md:hidden'>
				<div className='mx-auto flex max-w-md items-center gap-3'>
					<div className='min-w-0 flex-1'>
						<p className='text-xs text-zinc-400'>{copy.pricePrefix}</p>
						<p className='text-xl font-semibold text-[#f0b356]'>{data.price} ₴</p>
					</div>
					{data.active ? (
						<button
							className='rounded-xl bg-[#e2a550] px-5 py-3 font-semibold text-black'
							onClick={() => dataOrder()}
						>
							{copy.joinNow}
						</button>
					) : (
						<button className='rounded-xl border border-[#e2a550]/40 px-5 py-3 font-semibold text-[#e2a550]'>
							{copy.closed}
						</button>
					)}
				</div>
			</div>

			<hr className='opacity-10 my-5' />
			<div className='mb-14 lg:text-xl flex flex-col bg-blur rounded-lg p-2 gap-2 border border-white/5'>
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

