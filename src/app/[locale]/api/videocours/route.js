import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
const { userId } = await req.json()
	
		
	try {
		await initAdmin()
		const firestore = getFirestore()
		const linkSnapshot = await firestore
			.collection('order')
			.where('id', '==', userId)
			.get()

				

		 const documents = linkSnapshot.docs.map((doc) => ({
				orderNumber: doc.data().orderNumber,
				reason: doc.data().reason,
			
			}))

		

const filterVideo = documents.filter((item) => item.reason === 'Ok')
const filterVideoslice = filterVideo.map((item) => item.orderNumber.slice(-5))



  const videoLinks = []
	 for (const videoId of filterVideoslice) {
			const videoDoc = await firestore.collection('video').doc(videoId).get()
			if (videoDoc.exists) {
				// Змінено тут, щоб додати об'єкт з video та title
				videoLinks.push({
					video: videoDoc.data().video,
					title: videoDoc.data().title,
				})
			}
		}

		// Виправлено змінну, яка повертається
		return NextResponse.json({ data: videoLinks }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
