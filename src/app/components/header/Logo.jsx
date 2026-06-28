'use client'
import { useLocale } from 'next-intl'

// Сучасний SVG-логотип: монограма-колона (символ аналітики/освіти)
// у золотому колі. Масштабується без втрати якості, реагує на ховер.
const Logo = ({ compact = false }) => {
	const locale = useLocale()
	const title = {
		uk: { l1: 'Школа', l2: 'політичного аналізу' },
		ru: { l1: 'Школа', l2: 'политического анализа' },
		en: { l1: 'School of', l2: 'Political Analysis' },
	}[locale] || { l1: 'Школа', l2: 'політичного аналізу' }

	return (
		<div className='flex items-center gap-3 group'>
			<div
				className={`relative shrink-0 transition-all duration-300 ${
					compact ? 'w-10 h-10' : 'w-12 h-12'
				}`}
			>
				<svg
					viewBox='0 0 48 48'
					fill='none'
					className='w-full h-full'
					aria-hidden='true'
				>
					{/* зовнішнє золоте кільце */}
					<circle
						cx='24'
						cy='24'
						r='22'
						stroke='url(#goldRing)'
						strokeWidth='1.5'
						className='transition-all duration-500 group-hover:stroke-[#e2a550]'
					/>
					{/* монограма: стилізована літера «А» / колона */}
					<path
						d='M24 12 L33 34 H29.2 L27.4 29 H20.6 L18.8 34 H15 L24 12 Z M24 19.5 L21.7 26 H26.3 L24 19.5 Z'
						fill='url(#goldFill)'
					/>
					{/* основа-книга */}
					<rect
						x='15'
						y='35.5'
						width='18'
						height='2'
						rx='1'
						fill='#e2a550'
						opacity='0.9'
					/>
					<defs>
						<linearGradient id='goldRing' x1='0' y1='0' x2='48' y2='48'>
							<stop stopColor='#e2a550' />
							<stop offset='1' stopColor='#b87f33' />
						</linearGradient>
						<linearGradient id='goldFill' x1='14' y1='12' x2='34' y2='34'>
							<stop stopColor='#f3c878' />
							<stop offset='1' stopColor='#d29440' />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* текстовий лого — ховається на дуже вузьких екранах */}
			<div className={`hidden sm:flex flex-col leading-tight ${compact ? 'scale-95' : ''}`}>
				<span className='text-slate-200 text-[13px] font-semibold tracking-wide'>
					{title.l1}
				</span>
				<span className='text-[#e2a550] text-[13px] font-serif font-semibold tracking-wide -mt-0.5'>
					{title.l2}
				</span>
			</div>
		</div>
	)
}

export default Logo
