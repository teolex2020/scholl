'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gentium_Book_Plus } from 'next/font/google'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { Link } from '@/navigation'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const StartPage = ({
	title,
	name,
	descriptions,
	benefits = [],
	button,
	buttonSecondary,
	info,
}) => {
	return (
		<AnimatePresence>
			<section className='relative container mx-auto max-w-[1100px] px-4 pt-10 pb-12 lg:pt-16 lg:pb-16'>
				{/* фонове сяйво по центру */}
				<div className='pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] bg-[#e2a550]/10 blur-[120px] rounded-full -z-10' />

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.075, 0.82, 0.165, 1] }}
					className='flex flex-col items-center text-center gap-7'
				>
					{/* Заголовок-вигода */}
					<h1
						className={`${gentium.className} max-w-3xl text-[30px] leading-[1.15] sm:text-5xl lg:text-[52px] font-bold text-slate-100`}
					>
						{title} <span className='colorgold'>{name}</span>
					</h1>

					{/* Опис */}
					<p className='text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl'>
						{descriptions}
					</p>

					{/* CTA */}
					<div className='flex flex-col sm:flex-row items-center gap-4 mt-1'>
						<Link href='/course' className='w-full sm:w-auto'>
							<button className='group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#e2a550] hover:bg-[#d29440] text-black font-bold text-lg px-8 py-3.5 duration-300 shadow-lg shadow-[#e2a550]/20'>
								{button}
								<ArrowRightIcon className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</button>
						</Link>
						<a
							href='#how-to-start'
							className='w-full sm:w-auto text-center rounded-xl border border-white/15 hover:border-[#e2a550]/50 hover:bg-white/5 text-slate-200 font-semibold text-lg px-8 py-3.5 duration-300'
						>
							{buttonSecondary}
						</a>
					</div>

					{/* Мікро-гарантія */}
					<div className='flex items-center gap-2 text-sm text-slate-400 -mt-2'>
						<CheckIcon className='h-4 w-4 text-green-500' />
						<span>{info}</span>
					</div>

					{/* Буліти-вигоди — у ряд, балансують ширину */}
					<ul className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6'>
						{benefits.map((b, i) => (
							<li
								key={i}
								className='flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 text-slate-200 text-sm sm:text-[15px]'
							>
								<span className='shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-500/15'>
									<CheckIcon className='h-5 w-5 text-green-400' />
								</span>
								<span>{b}</span>
							</li>
						))}
					</ul>
				</motion.div>

				{/* роздільник до наступної секції */}
				<div className='mt-14 mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent' />
			</section>
		</AnimatePresence>
	)
}

export default StartPage
