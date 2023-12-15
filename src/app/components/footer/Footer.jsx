import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import youtube from "../../../../public/assets/YouTube.svg"
import tiktok from '../../../../public/assets/TikTok.svg'
import facebook from '../../../../public/assets/Facebook.svg'




const Footer = () => {
		const t = useTranslations('Foot')
  return (
		<div className='  lg:container flex justify-between items-center h-10 lg:mx-auto px-10'>
			<div className='flex gap-4'>
				©2023 <p className='hidden lg:flex'>{t('name')}</p>
			</div>
			<div className='flex flex-row space-x-6 justify-center'>
				<a href='#'>
					<div className=' relative w-5 h-5 '>
						<Image
							src={facebook}
							alt=''
							fill
							priority
							className='object-contain '
						/>
					</div>
				</a>

				<a href='#'>
					<div className='relative  w-5 h-5 '>
						<Image
							src={youtube}
							alt=''
							fill
							priority
							className='object-contain '
							sizes='(min-width: 20px) 50vw, 100vw'
						/>
					</div>
				</a>
				<a href='#'>
					<div className=' relative  w-5 h-5 '>
						<Image
							src={tiktok}
							alt=''
							fill
							priority
							className='object-contain '
							sizes='(min-width: 500px) 50vw, 100vw'
						/>
					</div>
				</a>
			</div>
		</div>
	)
}

export default Footer