'use client'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const menu = [
	{ id: 1, title: 'course', url: '/course' },
	{ id: 5, title: 'trainings', url: '/trainings' },
	{ id: 3, title: 'lecture', url: '/lectures' },
	{ id: 2, title: 'meeting', url: '/meeting' },
	{ id: 4, title: 'contact', url: '/contact' },
]

// Горизонтальна навігація з підсвіткою активного розділу.
// mobile=true — дрібніший шрифт, щоб усі пункти влізли в рядок без скролу.
const NavLinks = ({ className = '', mobile = false }) => {
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations('Menu')

	return (
		<nav className={className}>
			{menu.map((item) => {
				const active = pathname.includes(item.url)
				return (
					<Link
						key={item.id}
						href={item.url}
						locale={locale}
						className={`group relative shrink-0 whitespace-nowrap py-1.5 font-medium transition-colors duration-300 ${
							mobile ? 'text-[13px] px-0.5' : 'text-[15px] px-1'
						}`}
					>
						<span
							className={
								active
									? 'text-[#e2a550]'
									: 'text-slate-300 group-hover:text-white'
							}
						>
							{t(item.title)}
						</span>
						{/* анімоване підкреслення */}
						<span
							className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#e2a550] transition-all duration-300 ${
								active ? 'w-full' : 'w-0 group-hover:w-full'
							}`}
						/>
					</Link>
				)
			})}
		</nav>
	)
}

export default NavLinks
