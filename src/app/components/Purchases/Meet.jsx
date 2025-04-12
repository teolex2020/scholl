'use client'

import { useState, useEffect } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import withAuth from '@/lib/auth/whithAuth'
import Loader from '../Loader/Loader'
import { db } from '@/firebase/config'
import {
	collection,
	query,
	where,
	onSnapshot,
	getDocs,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Meet = () => {
	const [active, setActive] = useState(false)
	const id = useSelector((state) => state.counter.id)
	const auth = getAuth()
	const user = auth.currentUser
	const [data, setData] = useState([]) // Змінюємо на масив, початкове значення - пустий масив
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (user && id && !data.length) {
			// Перевірка на пустий масив data
			setLoading(true)
			const q = query(collection(db, 'order'), where('email', '==', user.email))

			const unsubscribe = onSnapshot(
				q,
				async (querySnapshot) => {
					const documents = querySnapshot.docs.map((doc) => ({
						orderNumber: doc.data().orderNumber,
						reason: doc.data().reason,
					}))

					const filterLinks = documents.filter((item) => item.reason === 'Ok')
					const filterLinksslice = filterLinks.map((item) =>
						item.orderNumber.slice(-5)
					)

					const filtLinks = await Promise.all(
						filterLinksslice.map(async (linkId) => {
							const referenceQuery = query(
								collection(db, 'reference'),
								where('idlessons', '==', linkId)
							)
							const querySnapshot = await getDocs(referenceQuery)
							if (!querySnapshot.empty) {
								const videoDoc = querySnapshot.docs[0]
								return {
									idlessons: videoDoc.data().idlessons,
									url: videoDoc.data().url,
									namelessons: videoDoc.data().namelessons,
								}
							}
							return null
						})
					)

					const validLinks = filtLinks.filter((link) => link !== null)

					if (validLinks.length > 0) {
						setData(validLinks) // Зберігаємо весь масив validLinks
						setActive(true)
					} else {
						setActive(false)
					}
					setLoading(false)
				},
				(error) => {
					console.error('Error in onSnapshot:', error)
					setLoading(false)
				}
			)

			// Відписка від прослуховування при розмонтуванні компонента
			return () => unsubscribe()
		}
	}, [user, id, data]) // Змінено залежність data на data.length для перевірки початкового завантаження

	if (loading) {
		return <Loader />
	}

	return (
		<div className='container mx-auto'>
			<div className='uppercase text-lg font-bold text-center md:text-start text-[#e2a550]'>
				В даному вікні відображаються всі Ваші зустрічі:
			</div>
			{active ? (
				<div className='flex flex-col gap-5'>
					{' '}
					{/* Змінено на flex-col для вертикального розташування посилань */}
					{data.map(
						(
							link,
							index // Проходимось по масиву data і рендеримо посилання для кожного елемента
						) => (
							<div
								key={index}
								className='flex flex-col md:flex-row gap-5  justify-between w-full max-w-5xl pt-5'
							>
								<div className='text-lg text-center md:text-start'>
									{link.namelessons}
								</div>{' '}
								{/* Використовуємо link.namelessons */}
								<div>
									<a href={link.url} target='_blank' rel='noopener noreferrer'>
										{' '}
										{/* Використовуємо link.url */}
										<button className='border-2 border-zinc-700 rounded-lg px-10 py-2 bg-blur h-12 md:h-12 hover:shadow1 flex items-center gap-6'>
											Перейти до зустрічі
											<ArrowLongRightIcon className='w-10 h-10' />
										</button>
									</a>
								</div>
							</div>
						)
					)}
				</div>
			) : (
				<div className='w-full h-full text-center'>
					У вас ще не має зустрічей...
				</div>
			)}
		</div>
	)
}

export default withAuth(Meet)
