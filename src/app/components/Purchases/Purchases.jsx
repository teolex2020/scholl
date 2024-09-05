'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import Loader from '../Loader/Loader'
import withAuth from '@/lib/auth/whithAuth'
import { db } from '@/firebase/config'
import {
	collection,
	query,
	where,
	onSnapshot,
	getDoc,
	doc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Purchases = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const id = useSelector((state) => state.counter.id)
	const t = useTranslations('Purchase')
	const auth = getAuth()
	const user = auth.currentUser

	console.log(data)

	useEffect(() => {
		if (user && id && !data) {
			setLoading(true)
			const q = query(collection(db, 'order'), where('id', '==', id))

			const unsubscribe = onSnapshot(
				q,
				async (querySnapshot) => {
					const documents = querySnapshot.docs.map((doc) => ({
						orderNumber: doc.data().orderNumber,
						reason: doc.data().reason,
					}))

						console.log('documents', documents)

					const filterVideo = documents.filter((item) => item.reason === 'Ok')
					const filterVideoslice = filterVideo.map((item) =>
						item.orderNumber.slice(-5)
					)

					console.log('filterVideoslice', filterVideoslice)

					const videoLinks = await Promise.all(
						filterVideoslice.map(async (videoId) => {
							const videoDoc = await getDoc(doc(db, 'video', videoId))
							if (videoDoc.exists()) {
								return {
									video: videoDoc.data().video,
									title: videoDoc.data().title,
								}
							}
							return null
						})
					)

					setData(videoLinks.filter((video) => video !== null))
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
	}, [user, id, data])

	if (loading) {
		return <Loader />
	}

	return (
		<div className='container mx-auto flex flex-wrap min-h-screen'>
			{data?.length > 0 ? (
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
