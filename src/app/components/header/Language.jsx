'use client'
import { useState, useRef, useEffect, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/navigation'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/solid'

const lang = [
	{ id: 'uk', title: 'Українська', short: 'UK' },
	{ id: 'en', title: 'English', short: 'EN' },
	{ id: 'ru', title: 'Русский', short: 'RU' },
]

const Language = () => {
	const [isPending, startTransition] = useTransition()
	const [open, setOpen] = useState(false)
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const ref = useRef(null)

	// Закриття при кліку поза дропдауном
	useEffect(() => {
		const onClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false)
		}
		document.addEventListener('mousedown', onClick)
		return () => document.removeEventListener('mousedown', onClick)
	}, [])

	const select = (id) => {
		setOpen(false)
		startTransition(() => {
			router.replace(pathname, { locale: id })
		})
	}

	const current = lang.find((l) => l.id === locale) || lang[0]

	return (
		<div ref={ref} className='relative z-50 text-sm'>
			<button
				onClick={() => setOpen((v) => !v)}
				className='flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/5 hover:border-[#e2a550]/50 hover:bg-white/10 text-slate-200 transition-all duration-300'
			>
				<GlobeAltIcon className='h-4 w-4 text-[#e2a550]' />
				<span className='font-semibold'>{current.short}</span>
				<ChevronDownIcon
					className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${
						open ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{open && (
				<ul className='absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#11171c]/95 backdrop-blur-xl shadow-xl overflow-hidden py-1'>
					{lang.map((l) => (
						<li key={l.id}>
							<button
								onClick={() => select(l.id)}
								className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-200 ${
									locale === l.id
										? 'text-[#e2a550] bg-[#e2a550]/10'
										: 'text-slate-300 hover:bg-white/5 hover:text-white'
								}`}
							>
								<span>{l.title}</span>
								<span className='text-xs opacity-60 font-semibold'>
									{l.short}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Language
