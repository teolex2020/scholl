"use client"
import {  useTransition } from 'react'
import { Gentium_Book_Plus } from 'next/font/google'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/navigation'

const lang = [
	{
		id: `uk`,
		title: `uk`,
	},

	{
		id: 'en',
		title: 'en',
	},
	{
		id: 'ru',
		title: 'ru',
	},
]

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

const Language = () => {

	//  const t = useTranslations('LocaleSwitcher')
	
 const [isPending, startTransition] = useTransition()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

function onSelectChange(event) {
	// const nextLocale = event.currentTarget.getAttribute('data-value')
	startTransition(() => {
		router.replace(pathname, { locale: event })
	})

}
  	
  return (
		<div className='cursor-pointer text-sm z-20 mr-32 lg:mr-0'>
			<ul
				className={` flex items-center space-x-3  ${gentium.className} uppercase`}
			>
				{lang.map((e) => (
					<li
						key={e.id}
						className={`${
							locale === e.id && ' text-xl'
						} cursor-pointer  duration-300  `}
						// onClick={() => dispatch(Languages(e.id))}
						onClick={() => onSelectChange(e.id)}
					>
						{e.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Language