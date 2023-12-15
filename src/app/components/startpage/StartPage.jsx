"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import ButtonStartPage from '../helper/ButtonStartPage'
import bg from "../../../../public/bg.png"
import Image from 'next/image'
import { Gentium_Book_Plus } from 'next/font/google'

 const gentium = Gentium_Book_Plus({
		weight: '400',
		subsets: ['latin'],
 })

const StartPage = ({title, name, descriptions, button}) => {
	//  const t = useTranslations('StartPage')
	return (
		<div className='container mx-auto elem bg-blur py-5 lg:pb-24 mt-0 lg:mt-24 relative '>
			<div className='flex justify-between flex-col lg:flex-row items-center lg:gap-48 '>
				<div className=' flex lg:flex-1 h-48 lg:h-[450px] w-96  relative justify-center '>
					<div className='absolute ml-28  bg-blue-300 w-96 h-full blur-3xl rounded-full opacity-[15%]'></div>
					<div className='absolute bg-blue-200 w-48 h-48 ml-32 blur-3xl rounded-full opacity-[25%]'></div>
					<Image
						src={bg}
						alt='trees '
						fill
						sizes='(min-width: 808px) 50vw, 100vw'
						className='object-cover'
						priority
					/>
				</div>
				<div className='flex flex-1 h-full  flex-col px-5 text-center lg:text-left  gap-5'>
					<div className={` ${gentium.className} py-6   `}>
						<p className='text-2xl'>{title}</p>{' '}
						<p className='colorgold text-5xl '> {name}</p>
					</div>
					{descriptions}
					<ButtonStartPage button={button} />
				</div>
			</div>
		</div>
	)
}

export default StartPage