'use client'

import React, { useState } from 'react'
import Choice from './Choice'
import Purchases from './Purchases'
import Meet from './Meet'
import { useTranslations } from 'next-intl'

const button = [
	{
		id: 1,
		title: 'Відео придбаних курсів/тренінгів/лекцій',
	},
	{
		id: 2,
		title: 'Посилання на зустрічі',
	},
]

const Allchoice = () => {
	const [active, setActive] = useState(1)
	const t = useTranslations('Allchoice') // Замість "Allchoice" використовуйте ключ локалізації

	const choice = (id) => {
		setActive(id)
	}

	return (
		<div>
			<div>
				<Choice
					button={button.map((item) => ({
						...item,
						title: t(item.id === 1 ? 'videos' : 'links'),
					}))}
					choice={choice}
					active={active}
				/>
			</div>

			<hr className='my-3 container mx-auto border border-zinc-700' />
			<div className='flex gap-6 px-12 py-8'>
				{active === 1 ? <Purchases /> : <Meet />}
			</div>
		</div>
	)
}

export default Allchoice
