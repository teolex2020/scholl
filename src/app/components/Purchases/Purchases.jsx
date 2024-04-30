'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import Loader from '../Loader/Loader'
import withAuth from '@/lib/auth/whithAuth'
const Purchases = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const id = useSelector((state) => state.counter.id)
const t = useTranslations('Purchase')
	useEffect(() => {
		// Перевірка, чи вже є дані, щоб уникнути непотрібних запитів
		if (!data) {
			setLoading(true) // Встановлення стану завантаження перед запитом
			fetch(`/api/videocours`, {
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
					setData(data.data) 
					setLoading(false) 
				})
				.catch((error) => {
					console.error('An error occurred:', error)
					setLoading(false) 
				})
		}
	}, [id, data]) 

	if(loading) {
		return (
			<Loader/>
		)
	}



	return (
		<div className='container mx-auto flex flex-wrap min-h-screen'>
			{data?.length > 0  ? (
				data?.map((item, i) => (
					<div
						key={i}
						className='h-80 text-center  w-80 border-2 border-zinc-600  rounded-lg p-2 bg-blur'
					>
						<video
							className='w-96 h-48 bg-black rounded-lg'
							controls
							poster={item.video}
						>
							<source src={item.video} type='video/mp4' />
							Ваш браузер не підтримує відео тег.
						</video>
						<div className='flex justify-center items-center uppercase py-4 h-24'>
							<h2>{item.title}</h2>
						</div>
					</div>
				))
			) : (
				<div className='flex justify-center items-center w-full h-full'>
					<h2>{t('title')} ....</h2>
				</div>
			)}
		</div>
	)
}

export default withAuth(Purchases)
