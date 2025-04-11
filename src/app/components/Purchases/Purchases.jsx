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
	getDocs, // Змінено на getDocs
	doc,
	getDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Purchases = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const id = useSelector((state) => state.counter.id)
	const t = useTranslations('Purchase')
	const auth = getAuth()
	const user = auth.currentUser

	console.log('User:', user)
	console.log('Order ID from Redux:', id)

	useEffect(() => {
		const fetchData = async () => {
			if (user && id && !data) {
				setLoading(true)

				try {
					const q = query(collection(db, 'order'), where('id', '==', id))
					const querySnapshot = await getDocs(q)
					console.log('Number of order documents:', querySnapshot.docs.length)

					const documents = querySnapshot.docs.map((doc) => {
						const data = doc.data()
						console.log('Order doc data:', data)
						return {
							orderNumber: data.orderNumber,
							reason: data.reason,
						}
					})
					console.log('Documents after mapping:', documents)

					const filterVideo = documents.filter((item) => item.reason === 'Ok')
					console.log('Filtered documents (reason === "Ok"):', filterVideo)
					const uniqueVideoIds = [
						...new Set(filterVideo.map((item) => item.orderNumber?.slice(-5))),
					]

					console.log('Unique Video IDs:', uniqueVideoIds)

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
					setData(filteredVideoLinks)
				} catch (error) {
					console.error('Error processing video data:', error)
					setData([])
				} finally {
					setLoading(false)
				}
			}
		}

		fetchData() // Викликаємо асинхронну функцію
	}, [user, id, data])

	if (loading) {
		return <Loader />
	}

	return (
		<div className='container mx-auto flex flex-wrap min-h-screen'>
			{data === null ? (
				<Loader />
			) : data.length > 0 ? (
				data.map((item, i) => (
					<div
						key={i}
						className='h-80 text-center  w-80 border-2 border-zinc-600  rounded-lg p-2 bg-blur'
					>
						{item?.video ? (
							<video
								className='w-96 h-48 bg-black rounded-lg'
								controls
								poster={item?.video}
								preload='metadata'
							>
								<source src={item?.video} type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						) : (
							<div className='w-96 h-48 flex items-center justify-center bg-gray-300 rounded-lg'>
								<p>Video not available</p>
							</div>
						)}
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
