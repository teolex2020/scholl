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



useEffect(() => {
	if (user && id && !data) {
		setLoading(true)
		// console.log(`User ID: ${user.uid}`, `Redux ID: ${id}`)

		const q = query(collection(db, 'order'), where('id', '==', id))

		const unsubscribe = onSnapshot(
			q,
			async (querySnapshot) => {
				try {
					const documents = querySnapshot.docs.map((doc) => ({
						orderNumber: doc.data().orderNumber,
						reason: doc.data().reason,
					}))

					const filterVideo = documents.filter((item) => item.reason === 'Ok')
					// console.log('Filtered orders:', filterVideo)
					const uniqueVideoIds = [
						...new Set(
							filterVideo.map((item) => {
								const videoId = item.orderNumber?.slice(-5)
								// console.log('Video Id after slice', videoId) 
								return videoId
							})
						),
					]
					// console.log('Unique video IDs:', uniqueVideoIds)
					const videoLinks = await Promise.all(
						uniqueVideoIds.map(async (videoId) => {
							if (!videoId) return null
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

					const filteredVideoLinks = videoLinks.filter(
						(video) => video !== null
					)
					// console.log('Filtered video links:', filteredVideoLinks)

					setData(filteredVideoLinks)
				} catch (error) {
					console.error('Error processing video data:', error)
					setData([]) // Очищення даних для відображення помилки
				} finally {
					setLoading(false)
				}
			},
			(error) => {
				console.error('Error in onSnapshot:', error)
				setData([]) // Очищення даних для відображення помилки
				setLoading(false)
			}
		)

		return () => unsubscribe()
	}
}, [user, id, data])

	if (loading) {
		return <Loader />
	}

	return (
		<div className='container mx-auto flex flex-wrap min-h-screen'>
			{data === null || loading ? (
				<Loader />
			) : data?.length > 0 ? (
				data?.map((item, i) => (
					<div
						key={i}
						className='h-80 text-center  w-80 border-2 border-zinc-600  rounded-lg p-2 bg-blur'
					>
						<video
							className='w-96 h-48 bg-black rounded-lg'
							controls
							poster={item?.video}
						>
							<source src={item?.video} type='video/mp4' />
							Ваш браузер не підтримує відео тег.
						</video>
						<div className='flex justify-center items-center   py-4 h-24  overflow-hidden'>
							<h2>{item?.title}</h2>
						</div>
					</div>
				))
			) : (
				<div className='flex justify-center items-center w-full  h-full'>
					<h2>{t('title')} ....</h2>
					{data?.length === 0 && <p>Failed to load video</p>}
				</div>
			)}
		</div>
	)
}

export default withAuth(Purchases)
