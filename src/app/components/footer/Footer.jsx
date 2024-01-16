import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'





const Footer = () => {
		const t = useTranslations('Foot')
  return (
		<div className='  lg:container flex justify-between items-center h-10 lg:mx-auto px-10'>
			<div className='flex gap-4'>
				©2023 <p className='hidden lg:flex'>{t('name')}</p>
			</div>
			<div className='flex flex-row space-x-6 justify-center'>
				<a
					href='https://www.facebook.com/profile.php?id=100068994386641'
					target='_blank'
				>
					<div className=' relative w-5 h-5 '>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1703600118/Facebook_xeej2n.svg'
							alt=''
							fill
							priority
							className='object-contain '
						/>
					</div>
				</a>

				<a
					href='https://www.youtube.com/channel/UCT0ve_Yq3PPSjw3pJDOK5DA%5C'
					target='_blank'
				>
					<div className='relative  w-5 h-5 '>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1703600106/YouTube_dwn8e8.svg'
							alt=''
							fill
							priority
							className='object-contain '
							sizes='(min-width: 20px) 50vw, 100vw'
						/>
					</div>
				</a>
				<a
					href='https://www.linkedin.com/in/ruslan-bortnik-87500538/'
					target='_blank'
				>
					<div className=' relative  w-5 h-5 '>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1703600129/LinkedIn_mmqxwd.svg'
							alt=''
							fill
							priority
							className='object-contain '
							sizes='(min-width: 500px) 50vw, 100vw'
						/>
					</div>
				</a>
				<a href='https://twitter.com/RuslanBortnik' target='_blank'>
					<div className=' relative  w-7 h-5 img '>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1703600138/twitter_j9fp1w.svg'
							alt=''
							fill
							priority
							className='object-contain  img'
							sizes='(min-width: 500px) 50vw, 100vw'
						/>
					</div>
				</a>
			</div>
		</div>
	)
}

export default Footer