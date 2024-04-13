'use client'
import React, { useEffect, useState } from 'react'
import Desctop from './Desctop'
import Mobiletable from './Mobiletable'
import Image from 'next/image'
import {
	PhoneIcon,
	EnvelopeOpenIcon,
	CameraIcon,
} from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ImagePopup from './ImagePopup'
import { Avatar } from '@/store/features/counterSlice'
import withAuth from '@/lib/auth/whithAuth'
import Loader from '../Loader/Loader'

const List = () => {
	const [loading, setLoading] = useState(false)
	const { avatar, id } = useSelector((state) => state.counter)
	const dispatch = useDispatch()

	const [orderdata, setOrderData] = useState()

	const t = useTranslations('Cabinet')
	const router = useRouter()

	useEffect(() => {
		if (!orderdata) {
			setLoading(true)
			function fetchData() {
				fetch(`/api/userInfo`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: id,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						setOrderData(data.data)
						setLoading(false)
					})
					.catch((error) => {
						console.error('An error occurred:', error)
						setLoading(false)
					})
			}

			fetchData()
		}
	}, [id, orderdata])

	const changeImage = () => {
		dispatch(Avatar(avatar))
	}

	if (loading) {
		return <Loader />
	}

	return (
		<div className='h-full flex  items-center lg:items-start lg:justify-between flex-col lg:flex-row container mx-auto relative'>
			<div className='w-96 h-full lg:bg-blur flex flex-2 flex-col items-center py-5 gap-5 rounded-xl lg:m-10'>
				<div className='absolute top-0 right-0 left-0 flex justify-center lg:items-center  h-full  '>
					{' '}
					{avatar && <ImagePopup />}
				</div>
				<p className='text-2xl'>{t('title')}</p>
				<div className=''>
					<div className='w-24 h-24 lg:w-48 lg:h-48 rounded-full bg-blur relative'>
						<div
							className='flex items-center justify-center border-2 border-zinc-400 rounded-full w-10 h-10 bg-white z-[100] absolute bottom-0 right-0 cursor-pointer'
							onClick={changeImage}
						>
							<CameraIcon className='h-8 w-8 fill-black' />
						</div>
						{orderdata?.img ? (
							<Image
								src={orderdata?.img}
								fill
								alt='nonimage'
								className=' object-cover rounded-full '
								loading='lazy'
								sizes='(min-width: 808px) 50vw, 100vw'
							/>
						) : (
							<Image
								src='https://res.cloudinary.com/dentkbzne/image/upload/v1702742137/notphoto_ziwbqm.jpg'
								fill
								alt='nonimage'
								className='rounded-full, object-cover rounded-full '
								priority
								sizes='(min-width: 808px) 50vw, 100vw'
							/>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-5'>
					<div className='flex gap-3 text-xl'>
						<p>{orderdata?.lastName ? orderdata?.lastName : 'Your'}</p>
						<p>{orderdata?.firstName ? orderdata?.firstName : 'Name'}</p>
					</div>

					<div className='flex gap-3 text-sm'>
						<div className='flex items-center space-x-3 uppercase'>
							<EnvelopeOpenIcon className='h-5 w-5 ' />
						</div>
						<div className=''>
							<p>{orderdata?.email ? orderdata?.email : 'email@email.com'}</p>
						</div>
					</div>
					<div className='flex gap-3 text-sm'>
						<div className='flex items-center space-x-3 uppercase'>
							<PhoneIcon className='h-5 w-5 ' />
						</div>
						<div className=''>
							<p>{orderdata?.phone ? orderdata?.phone : '099-999-99-99'}</p>
						</div>
					</div>
				</div>

				<div className='z-50'>
					<button
						onClick={() => router.push(`/infouser/${id}`)}
						className={` border-2 rounded-3xl border-zinc-700/50  justify-center py-3 flex  duration-300 hover:bg-blur  px-10 my-5 text-sm min-w-[200px] `}
					>
						{t('button')}
					</button>{' '}
				</div>
			</div>
			<hr className='opacity-10 w-full py-3 lg:hidden' />
			<div className='flex flex-col gap-10 lg:p-10 flex-1 '>
				<div className='lg:bg-blur min-h-[500px] w-full rounded-xl lg:p-5 '>
					<div className='lg:hidden px-5'>
						<Mobiletable />
					</div>
					<div className='hidden lg:block px-10'>
						<Desctop />
					</div>
				</div>
			</div>
		</div>
	)
}

export default withAuth(List)
