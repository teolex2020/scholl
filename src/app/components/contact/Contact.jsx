'use client'
import React, { useRef } from 'react'

import Image from 'next/image'
import {
	PhoneIcon, EnvelopeOpenIcon, MapPinIcon
} from '@heroicons/react/24/solid'



const ContactComponent = () => {

	return (
		<div className='container mx-auto'>
			<h1 className='text-xl md:text-4xl lg:my-16 text-center text-white'>
				Связаться с нами
			</h1>
			<div className='flex items-center gap-10 flex-col lg:flex-row px-5'>
				<div className='flex  flex-1 relative w-80 h-full border p-10 border-zinc-700/50 rounded-sm'>
			
					<div className='flex flex-col gap-10'>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<PhoneIcon className='h-6 w-6 fill-[#e2a550]' />
								<p className='colorgold'>Phone</p>
							</div>
							<div className='pl-6 pt-3'>
								<p>+38(099)-999-99-99</p>
								<p>+38(099)-999-99-99</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<EnvelopeOpenIcon className='h-6 w-6 fill-[#e2a550]' />
								<p className='colorgold'>Email</p>
							</div>
							<div className='pl-6 pt-3'>
								<p>school@school.com</p>
								<p>school@school.com</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<MapPinIcon className='h-6 w-6 fill-[#e2a550]' />
								<p className='colorgold'>Email</p>
							</div>
							<div className='pl-6 pt-3'>
								<p>Address</p>
								<p>Ukraine, Kiev</p>
								<p>str. Godjosdjsodj</p>
							</div>
						</div>
					</div>
				</div>
				<div className='flex-1 relative h-full w-full'>
					<div className='absolute top-0 bottom-0 left-0 right-0 bg-black/50'></div>
					<Image
						src='/map.jpg'
						alt=''
						width={1000}
						height={1000}
						priority
						className='object-contain '
					/>
				</div>
			</div>
		</div>
	)
}

export default ContactComponent
