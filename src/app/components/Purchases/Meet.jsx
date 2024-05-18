"use client"

import React, {useState} from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

const Meet = () => {
  	const [active, setActive] = useState(false)
  return (
		<div className='container mx-auto'>
			<div className='uppercase text-lg font-bold text-center md:text-start text-[#e2a550]'>
				В даному вікні відображаються всі Ваші зустрічі:
			</div>
			{active ? (
				<div className='flex flex-col md:flex-row gap-5 items-center '>
					<div className='text-lg text-center md:text-start'>
						Основи практичного політичного аналізу: як відрізняти правду від
						брехні та приймати правильні рішення
					</div>
					<div>
						<button className='border-2 border-zinc-700 rounded-lg px-10 py-2 bg-blur h-16 md:h-12 hover:shadow1 flex items-center gap-6'>
							Перейти до зустрічі
							<ArrowLongRightIcon className='w-10 h-10' />
						</button>
					</div>
				</div>
			) : (
				<div className='w-full h-full text-center'>
					{' '}
					У вас ще не має зустрічей...
				</div>
			)}
		</div>
	)
}

export default Meet