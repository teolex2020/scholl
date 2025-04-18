'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
	PhoneIcon, EnvelopeOpenIcon, MapPinIcon, GlobeAltIcon, UsersIcon
} from '@heroicons/react/24/solid'
import darkmap from '../../../../public/assets/darkmap.webp'
import facebook from '../../../../public/assets/facebook.png'
import youtube from '../../../../public/assets/youtube.png'

const ContactComponent = () => {
	const t = useTranslations('Contact')
	return (
		<div className='container mx-auto px-[3%]'>
			<h1 className=' md:text-4xl lg:my-16 text-center text-white py-5 lg:py-0'>
				{t('title')}
			</h1>
			<div className='flex items-center gap-10 flex-col lg:flex-row lg:border border-zinc-700/50 rounded-sm '>
				<div className='flex   relative w-96 h-full  px-10 py-5 '>
					<div className='flex flex-col gap-6 '>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<UsersIcon className='h-4 w-4 fill-[#e2a550]' />
								<p className='colorgold  font-semibold'>Teams</p>
							</div>
							<div className='lg:pl-20 pt-3'>
								<p className='text-sm'>
									<span className='font-bold text-base'>Оксана Красовская</span>{' '}
									— Автор идеи Школы политического анализа Руслана Бортника и
									менеджер проекта
								</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<PhoneIcon className='h-4 w-4 fill-[#e2a550]' />
								<p className='colorgold  font-semibold'>Phone</p>
							</div>
							<div className='lg:pl-20 pt-3 text-sm'>
								<p>+38(063)-789-32-57</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<EnvelopeOpenIcon className='h-4 w-4 fill-[#e2a550]' />
								<p className='colorgold  font-semibold'>Email</p>
							</div>
							<div className='lg:pl-20 pt-3 text-sm'>
								<p>bortnikschool@gmail.com</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<MapPinIcon className='h-4 w-4 fill-[#e2a550]' />
								<p className='colorgold  font-semibold'>Address</p>
							</div>
							<div className='lg:pl-20 pt-3 text-sm'>
								<p>Address</p>
								<p>Ukraine, Kiev</p>
							</div>
						</div>
						<div>
							<div className='flex items-center space-x-3 uppercase'>
								<GlobeAltIcon className='h-4 w-4 fill-[#e2a550]' />
								<p className='colorgold  font-semibold'>
									Social networks
								</p>
							</div>
							<div className='lg:pl-20 pt-3 text-sm '>
								<a
									href='https://www.facebook.com/profile.php?id=61558367292698&rdid=JZrIc8Y0RdLk6g1N&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FzBrJTgSkUfSGZPZ8%2F'
									target='_blank'
									rel='noreferrer'
									className='relative w-5 h-5 flex gap-3 cursor-pointer'
								>
									<Image
										src={facebook}
										alt={`${facebook} page`}
										width={20}
										height={20}
										priority
										className='object-contain img'
										sizes='(min-width: 808px) 50vw, 100vw'
									/>
									<p>Facebook</p>
								</a>
								<a
									href='https://www.youtube.com/@BortnikSchool'
									target='_blank'
									rel='noreferrer'
									className='relative w-5 h-5 flex gap-3 cursor-pointer mt-3'
								>
									<Image
										src={youtube}
										alt={`${youtube} page`}
										width={20}
										height={20}
										priority
										className='object-contain img'
										sizes='(min-width: 808px) 50vw, 100vw'
									/>
									<p>YouTube</p>
								</a>
							</div>
						</div>
						
					</div>
				</div>
				<div className='flex-1 relative h-[500px] w-full flex justify-end p-5 lg:p-0'>
					<div className='absolute top-0 bottom-0 left-0 right-0 bg-[#12181d]/30'></div>
					<Image
						src={darkmap}
						alt=''
						width={1000}
						height={1000}
						priority
						className='object-cover '
					/>
				</div>
			</div>
		</div>
	)
}

export default ContactComponent
