"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import {
	CalendarIcon,
	CheckCircleIcon,
	ClockIcon,
	LockClosedIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid'
import { useLocale, useTranslations } from 'next-intl'

const localizedCopy = {
	ua: {
		open: 'Реєстрація відкрита',
		closed: 'Реєстрацію закрито',
		format: 'Закрита онлайн-зустріч',
		noRecord: 'Без запису',
		access: 'Посилання зʼявиться у кабінеті перед подією.',
		seat: 'місце на зустрічі',
		value: 'Живий діалог, можливість поставити питання та отримати практичні орієнтири.',
	},
	uk: {
		open: 'Реєстрація відкрита',
		closed: 'Реєстрацію закрито',
		format: 'Закрита онлайн-зустріч',
		noRecord: 'Без запису',
		access: 'Посилання зʼявиться у кабінеті перед подією.',
		seat: 'місце на зустрічі',
		value: 'Живий діалог, можливість поставити питання та отримати практичні орієнтири.',
	},
	ru: {
		open: 'Регистрация открыта',
		closed: 'Регистрация закрыта',
		format: 'Закрытая онлайн-встреча',
		noRecord: 'Без записи',
		access: 'Ссылка появится в кабинете перед событием.',
		seat: 'место на встрече',
		value: 'Живой диалог, возможность задать вопрос и получить практические ориентиры.',
	},
	en: {
		open: 'Registration open',
		closed: 'Registration closed',
		format: 'Closed online meeting',
		noRecord: 'No recording',
		access: 'The link will appear in your account before the event.',
		seat: 'seat for the meeting',
		value: 'Live dialogue, a chance to ask questions, and practical orientation.',
	},
}

const Cart = ({ dataOrder, price, alltime, image, active, donat, title }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const t = useTranslations('Card')
	const locale = useLocale()
	const copy = localizedCopy[locale] || localizedCopy.ua

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen)
	}

	return (
		<div className='w-full md:w-96 overflow-hidden rounded-2xl border border-[#e2a550]/20 bg-[#13181d] p-4 md:p-5 relative shadow-[0_18px_55px_rgba(0,0,0,0.45)]'>
			<div className='bg-blur absolute inset-0 z-0 rounded-2xl'></div>
			<div className='absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-[#e2a550]/14 to-transparent'></div>

			<div className='relative z-10 mb-3 flex items-center justify-between gap-3'>
				<span
					className={`rounded-full border px-3 py-1 text-xs font-medium ${
						active
							? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
							: 'border-red-400/25 bg-red-500/10 text-red-300'
					}`}
				>
					{active ? copy.open : copy.closed}
				</span>
				<span className='text-xs text-zinc-400'>{copy.format}</span>
			</div>

			<div className='lg:w-[320px] h-48 md:h-64 mx-auto flex justify-center relative mt-1 overflow-hidden rounded-xl'>
				<Image
					src={`/assets/${image}`}
					sizes='(min-width: 808px) 50vw, 100vw'
					fill
					alt='bortnikcourse'
					className='object-cover'
					priority
				/>
			</div>

			<div className='relative z-10 mt-4 rounded-2xl border border-white/[0.08] bg-black/20 p-4'>
				<p className='text-xs uppercase tracking-[0.14em] text-zinc-400'>{t('price')}</p>
				<div className='mt-2 flex items-end gap-3 font-semibold colorgold'>
					<p className='text-4xl md:text-5xl leading-none'>{price} ₴</p>
					<p className='pb-1 text-sm text-zinc-400'>{copy.seat}</p>
				</div>
			</div>

			<div className='relative z-10 mt-4 flex flex-col gap-3 text-start text-sm'>
				<p className='line-clamp-4 text-base font-semibold leading-6 text-white'>{title}</p>

				<div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3 text-zinc-300'>
					<div className='flex gap-3 items-center'>
						<LockClosedIcon className='h-4 w-4 text-[#f0b356]' />
						<p>{copy.noRecord}</p>
					</div>
					<div className='flex gap-3 items-center'>
						<ClockIcon className='h-4 w-4 text-[#f0b356]' />
						<p>
							{alltime || 90} {t('time')}
						</p>
					</div>
					<div className='flex gap-3 items-start'>
						<CalendarIcon className='mt-0.5 h-4 w-4 text-[#f0b356]' />
						<p>{copy.access}</p>
					</div>
				</div>

				<div className='rounded-2xl border border-[#e2a550]/15 bg-[#e2a550]/[0.06] p-4'>
					<div className='flex gap-3 items-start'>
						<CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-emerald-400' />
						<p className='leading-6 text-zinc-200'>{copy.value}</p>
					</div>
				</div>

				<div className='w-full flex justify-center'>
					{active ? (
						<button
							className='w-full rounded-2xl bg-[#e2a550] px-8 py-3.5 text-xl font-semibold text-black shadow-[0_12px_30px_rgba(226,165,80,0.2)] duration-300 hover:bg-[#f0b356]'
							onClick={() => dataOrder()}
						>
							{t('button')}
						</button>
					) : (
						<button className='w-full rounded-2xl border border-[#e2a550]/50 px-8 py-3.5 text-xl font-semibold text-[#e2a550] opacity-70'>
							{t('buttonClose')}
						</button>
					)}
				</div>
			</div>

			{donat && (
				<div className='z-10 w-full text-center my-3 relative'>
					<p className='opacity-50'>&&</p>
					<button className='hover:scale-105 duration-500' onClick={togglePopup}>
						{t('donat')}
					</button>
				</div>
			)}

			{isPopupOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-black/50 p-5 rounded-lg relative'>
						<button className='absolute top-0 right-0' onClick={togglePopup}>
							<XMarkIcon className='h-8 w-8' />
						</button>
						<Image
							src={`/assets/${donat}`}
							sizes='(min-width: 808px) 50vw, 100vw'
							width={500}
							height={500}
							className='object-cover'
							priority
							alt='QR Code for donation'
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
