'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
// import { useTranslations } from 'next-intl'

const NotFoundComponent = () => {
	// const t = useTranslations('Helper')
	return (
		<div className=' relative overflow-hidden'>
			<div className=' mt-10 flex flex-col gap-12 items-center justify-center'>
				<div className='text-center'>
					<Link href='/'>
						<div className='cursor-pointer'>
							<Image
								className="w-full h-full rounded-full"
								src='/notfound.png'
								width={340}
								height={360}
								alt='404'
							/>
						</div>
					</Link>
				</div>
			</div>
			<div style={circleBackgroundStyle}></div>
		</div>
	)
}

export default NotFoundComponent
const circleBackgroundStyle = {
	position: 'absolute',
	top: '-50px',
	right: '50px',
	width: '300px',
	height: '300px',
	borderRadius: '50%',
	background: '#00c1a1a5',
	transform: 'rotate(45deg)',
	zIndex: -1,
	animation: `moveCircle2 10s linear infinite`,
	overFlow: 'hidden',
}
