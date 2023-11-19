import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
		<div className=' mx-[5%] lg:container flex justify-between h-8 '>
			<div className='flex gap-4'>
				©2023{' '}
				<p className='hidden lg:flex'>
					{' '}
					Школа политического анализа Руслана Бортника
				</p>
			</div>
			<div className='flex flex-row space-x-6 justify-center'>
				<a href='#'>
					<div className=' relative w-5 h-5 '>
						<Image
							src='/Facebook.svg'
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
							src='/YouTube.svg'
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
							src='/TikTok.svg'
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