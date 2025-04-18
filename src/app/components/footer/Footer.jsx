import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import facebook from '../../../../public/assets/facebook.png'
import linkedln from '../../../../public/assets/linkedin.png'
import youtube from '../../../../public/assets/youtube.png'
import twitter from '../../../../public/assets/twitter.png'

const socialLinks = [
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/profile.php?id=100068994386641',
		image: facebook,
	},
	{
		name: 'YouTube',
		url: 'https://www.youtube.com/channel/UCT0ve_Yq3PPSjw3pJDOK5DA%5C',
		image: youtube,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/ruslan-bortnik-87500538/',
		image: linkedln,
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/RuslanBortnik',
		image: twitter,
	},
]

const Footer = () => {
	const t = useTranslations('Login')

	return (
		<div className='lg:container flex justify-center lg:justify-between items-center  lg:mx-auto px-10  '>
			<div className='lg:flex gap-4 hidden'>
				©2025
				<div className='text-sm z-10'>
					<Link href='/teamofservise'>
						<span className='underline cursor-pointer'>{t('service')}</span>
					</Link>
					<span> & </span>
					<Link href='/privatpolicy'>
						<span className='underline cursor-pointer'>{t('policy')}</span>
					</Link>
					<span> & </span>
					<Link href='/publicofer'>
						<span className='underline cursor-pointer'>{t('offer')}</span>
					</Link>
				</div>
			</div>
			<div className='flex flex-row space-x-6 justify-center img'>
				{socialLinks.map(({ name, url, image }) => (
					<a
						key={name}
						href={url}
						target='_blank'
						rel='noreferrer'
						className='relative w-5 h-5'
					>
						<Image
							src={image}
							alt={`${name} page`}
							fill
							priority
							className='object-contain'
							sizes='(min-width: 808px) 50vw, 100vw'
						/>
					</a>
				))}
			</div>
		</div>
	)
}

export default Footer
