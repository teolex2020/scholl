"use client"
import React from 'react'
import Image from 'next/image'
import {
	ClockIcon,
	VideoCameraIcon,
	AcademicCapIcon,
	CalendarDaysIcon,
	LanguageIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/solid'
import { useLocale, useTranslations } from 'next-intl'

const localizedCopy = {
	ua: {
		enrollmentOpen: 'Набір відкрито',
		enrollmentClosed: 'Набір закрито',
		onlineFormat: 'Онлайн-формат',
		fullCourse: 'за повний курс',
		promise:
			'Ви купуєте не набір відео, а готову рамку рішень: що бачити, як оцінювати ризики і як діяти далі.',
		accessNote: 'Після оплати доступ відкривається в особистому кабінеті.',
	},
	uk: {
		enrollmentOpen: 'Набір відкрито',
		enrollmentClosed: 'Набір закрито',
		onlineFormat: 'Онлайн-формат',
		fullCourse: 'за повний курс',
		promise:
			'Ви купуєте не набір відео, а готову рамку рішень: що бачити, як оцінювати ризики і як діяти далі.',
		accessNote: 'Після оплати доступ відкривається в особистому кабінеті.',
	},
	ru: {
		enrollmentOpen: 'Набор открыт',
		enrollmentClosed: 'Набор закрыт',
		onlineFormat: 'Онлайн-формат',
		fullCourse: 'за полный курс',
		promise:
			'Вы покупаете не набор видео, а готовую рамку решений: что видеть, как оценивать риски и как действовать дальше.',
		accessNote: 'После оплаты доступ откроется в личном кабинете.',
	},
	en: {
		enrollmentOpen: 'Enrollment open',
		enrollmentClosed: 'Enrollment closed',
		onlineFormat: 'Online format',
		fullCourse: 'for the full course',
		promise:
			'You are buying not just a set of videos, but a practical decision framework: what to notice, how to assess risks, and how to act next.',
		accessNote: 'After payment, access will appear in your personal account.',
	},
}

const Cart = ({
	dataOrder,
	price,
	alltime,
	image,
	active,
	datastart,
	dataend,
	language,
}) => {
	const t = useTranslations('Card')
	const locale = useLocale()
	const copy = localizedCopy[locale] || localizedCopy.ua

	return (
		<div className='w-full md:w-96 bg-[#13181d] relative rounded-2xl p-4 md:p-5 border border-[#e2a550]/15 shadow-[0_18px_50px_rgba(0,0,0,0.45)] overflow-hidden'>
			<div className='bg-blur absolute inset-0 z-0 rounded-2xl'></div>
			<div className='absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#e2a550]/10 to-transparent z-0'></div>

			<div className='relative z-10 flex items-center justify-between gap-3 mb-3 md:mb-4'>
				<span className='rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300'>
					{active ? copy.enrollmentOpen : copy.enrollmentClosed}
				</span>
				<span className='text-xs text-zinc-400'>{copy.onlineFormat}</span>
			</div>

			<div className='w-full max-w-[320px] h-40 md:h-64 mx-auto flex justify-center relative mt-1 rounded-xl overflow-hidden'>
				<Image
					src={`/assets/${image}`}
					sizes='(min-width: 808px) 50vw, 100vw'
					fill
					alt='bortnikcourse'
					className='object-cover'
					priority
				/>
			</div>

			<div className='relative z-10 mt-4 md:mt-6 rounded-2xl border border-white/6 bg-black/15 p-4'>
				<p className='text-sm uppercase tracking-[0.12em] text-zinc-400'>{t('price')}</p>
				<div className='mt-2 flex items-end gap-3 font-semibold colorgold'>
					<p className='text-3xl md:text-5xl leading-none'>{price} ₴</p>
					<p className='text-sm text-zinc-400 pb-1'>{copy.fullCourse}</p>
				</div>
			</div>

			<div className='relative z-10 text-sm text-start mt-4 md:mt-5 flex flex-col gap-3'>
				<div className='rounded-2xl border border-white/6 bg-white/[0.03] p-4 space-y-2.5 md:space-y-3'>
					<p className='text-zinc-300'>{t('course')}</p>
					<div className='flex gap-3 items-center'>
						<ClockIcon className='h-4 w-4 text-[#f0b356]' />
						<p>
							{alltime} {t('time')}
						</p>
					</div>
					<div className='flex gap-3 items-center'>
						<VideoCameraIcon className='h-4 w-4 text-[#f0b356]' />
						<p>{t('video')}</p>
					</div>
					<div className='flex gap-3 items-center'>
						<AcademicCapIcon className='h-4 w-4 text-[#f0b356]' />
						<p>{t('certificate')}</p>
					</div>
					{datastart && dataend && (
						<div className='flex gap-3 items-center'>
							<CalendarDaysIcon className='h-4 w-4 text-[#f0b356]' />
							<p>
								{datastart} - {dataend}
							</p>
						</div>
					)}
					{language && (
						<div className='flex gap-3 items-center'>
							<LanguageIcon className='h-4 w-4 text-[#f0b356]' />
							<p className='uppercase'>{language}</p>
						</div>
					)}
				</div>

				<div className='rounded-2xl border border-[#e2a550]/15 bg-[#e2a550]/[0.05] p-3.5 md:p-4'>
					<div className='flex gap-3 items-start'>
						<CheckCircleIcon className='h-5 w-5 text-emerald-400 mt-0.5 shrink-0' />
						<p className='text-zinc-200 leading-relaxed'>{copy.promise}</p>
					</div>
				</div>

				<div className='w-full flex justify-center'>
					{active ? (
						<button
							className='mt-1 w-full rounded-2xl border border-[#e2a550] bg-[#e2a550]/10 colorgold hover:font-semibold justify-center py-3 duration-300 hover:bg-[#e2a550]/20 z-10 text-xl md:text-2xl px-6'
							onClick={() => dataOrder()}
						>
							{t('button')}
						</button>
					) : (
						<button className='mt-1 w-full rounded-2xl border border-[#e2a550] colorgold justify-center py-3 duration-300 z-10 text-xl md:text-2xl px-6 opacity-70'>
							{t('buttonClose')}
						</button>
					)}
				</div>

				<p className='text-center text-xs text-zinc-500'>{copy.accessNote}</p>
			</div>
		</div>
	)
}

export default Cart
