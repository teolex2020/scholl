'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PROMO_CODE = process.env.NEXT_PUBLIC_PROMO_CODE || 'E0DF77E4D0496'
const EXPIRATION_DATE = new Date('2025-09-01')
const COPY_FEEDBACK_MS = 1800

const ANIMATION = {
	initial: { y: -60, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -60, opacity: 0 },
	transition: { type: 'spring', stiffness: 90, damping: 12 },
}

export default function DiscountBanner() {
	const t = useTranslations('DiscountBanner')
	const [open, setOpen] = useState(true)
	const [copied, setCopied] = useState(false)

	/* ховаємо банер після дати закінчення */
	useEffect(() => {
		if (Date.now() > EXPIRATION_DATE.getTime()) setOpen(false)
	}, [])

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard?.writeText(PROMO_CODE)
		} catch {
			/* fallback */
		}
		setCopied(true)
		const id = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
		return () => clearTimeout(id)
	}, [])

	const Promo = () => (
		<button
			onClick={handleCopy}
			title={t('copy')}
			aria-label={`${t('copy')} ${PROMO_CODE}`}
			className='inline-flex cursor-copy items-center gap-1 rounded-md
                 bg-red-500 px-2 py-0.5 font-mono text-yellow-100
                 transition hover:bg-red-600 focus:outline-none
                 focus:ring-2 focus:ring-yellow-400'
			style={{ overflowWrap: 'break-word' }}
		>
			{PROMO_CODE}
			{copied && <span className='animate-pulse text-xs'>{t('copied')}</span>}
		</button>
	)

	return (
		<AnimatePresence mode='wait'>
			{open && (
				<motion.div
					{...ANIMATION}
					role='alert'
					aria-live='polite'
					className='relative mx-auto my-6 w-[95%] max-w-5xl
                     rounded-2xl border-2 border-[#e2a550]
                     bg-yellow-400/10 p-4 shadow-lg backdrop-blur-sm
                     flex flex-col md:flex-row md:items-center md:gap-4'
				>
					{/* іконка — не показуємо на XS */}
					<div className='sm:block hidden shrink-0 md:mr-4'>
						<Image
							src='/assets/gift.webp'
							alt='Gift icon'
							width={88}
							height={88}
							priority
							className='rounded-lg object-cover'
						/>
					</div>

					{/* текст */}
					<div className='flex-1 text-sm leading-relaxed md:text-base'>
						{t.rich('message', {
							strong: (chunk) => (
								<strong className='rounded-md bg-red-500 px-1 font-semibold text-yellow-100'>
									{chunk}
								</strong>
							),
							promo: Promo,
						})}
					</div>

					{/* іконка закриття */}
					<button
						onClick={() => setOpen(false)}
						aria-label={t('close')}
						className='absolute top-2 right-2 inline-flex h-8 w-8
                       items-center justify-center rounded-full border-2
                       border-[#e2a550] text-yellow-100 transition
                       hover:bg-yellow-400/20 focus:outline-none
                       focus:ring-2 focus:ring-yellow-400 bg-[#12181d]'
					>
						✕
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
