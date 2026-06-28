'use client'
import { useState, useEffect } from 'react'
import { Gentium_Book_Plus } from 'next/font/google'

import Language from './Language'
import { Link, useRouter } from '@/navigation'
import Button from './Button.jsx'
import MobileButon from './MobileButon'
import MobileMenu from './MobileMenu'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import { BellIcon } from '@heroicons/react/24/solid'
import Popupbell from './PopupBell'
import { PopupBell } from '@/store/features/counterSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Header = () => {
	const dispatch = useDispatch()
	const { mobilemenu, popupBell } = useSelector((state) => state.counter)

	const router = useRouter()
	const t = useTranslations('Header')
	const [query, setQuery] = useState('')
	const [scrolled, setScrolled] = useState(false)
	const [searchFocused, setSearchFocused] = useState(false)

	// Хедер ущільнюється і темнішає при скролі — типова мікровзаємодія 2026
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const popup = () => dispatch(PopupBell(popupBell))

	const handleSearch = (e) => {
		e.preventDefault()
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query.trim())}`)
		}
	}

	return (
		<header
			className={`sticky top-0 z-40 w-full transition-all duration-300 ${
				scrolled
					? 'bg-[#0b1015]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
					: 'bg-[#0b1015]/40 backdrop-blur-md border-b border-white/5'
			}`}
		>
			{/* тонка золота лінія-акцент зверху */}
			<div className='h-[2px] w-full bg-gradient-to-r from-transparent via-[#e2a550]/60 to-transparent' />

			<div className='lg:container w-full mx-auto px-4'>
				{mobilemenu && <MobileMenu />}
				{popupBell && <Popupbell />}

				<div
					className={`flex items-center justify-between gap-4 transition-all duration-300 ${
						scrolled ? 'h-16' : 'h-[72px] lg:h-20'
					}`}
				>
					{/* Лого */}
					<Link href='/' className='shrink-0 cursor-pointer z-10'>
						<Logo compact={scrolled} />
					</Link>

					{/* Десктоп-навігація */}
					<NavLinks className='hidden lg:flex items-center gap-7 flex-1 justify-center' />

					{/* Пошук (десктоп/планшет) */}
					<form
						onSubmit={handleSearch}
						className='hidden sm:block relative flex-1 max-w-xs lg:max-w-[260px]'
					>
						<MagnifyingGlassIcon
							className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
								searchFocused ? 'text-[#e2a550]' : 'text-slate-500'
							}`}
						/>
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
							className='w-full rounded-full pl-10 pr-4 h-10 bg-white/5 text-white placeholder:text-slate-500 border border-white/10 focus:border-[#e2a550]/60 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 text-sm'
							placeholder={t('searchPlaceholder')}
						/>
					</form>

					{/* Права група: мова + CTA */}
					<div className='flex items-center gap-3 shrink-0'>
						<div className='hidden sm:block'>
							<Language />
						</div>

						<div className='hidden lg:flex items-center'>
							<Button font={gentium.className} />
						</div>

						<MobileButon />
					</div>
				</div>
			</div>

			{/* мобільна навігація — усі пункти рівномірно в один рядок, без скролу */}
			<div className='lg:hidden border-t border-white/5 bg-[#0b1015]/60 backdrop-blur-md'>
				<NavLinks
					mobile
					className='flex items-center justify-between px-3 py-2.5'
				/>
			</div>
		</header>
	)
}

export default Header
