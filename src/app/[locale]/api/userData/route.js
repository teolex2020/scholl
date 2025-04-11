import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
	const { userId } = await req.json()

	try {
		await initAdmin()
		const firestore = getFirestore()

		// 1. Отримуємо email користувача по userId
		const userSnapshot = await firestore
			.collection('users')
			.where('id', '==', userId)
			.limit(1)
			.get()

		if (userSnapshot.empty) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		const userEmail = userSnapshot.docs[0].data().email
		console.log('Found user email:', userEmail)

		// 2. Шукаємо замовлення по email
		const orderSnapshot = await firestore
			.collection('order')
			.where('email', '==', userEmail)
			.get()

		const documents = orderSnapshot.docs.map((doc) => ({
			title: doc.data().orderTitle,
			reason: doc.data().reason,
		
		}))

		return NextResponse.json({ data: documents }, { status: 200 })
	} catch (error) {
		console.error('Error fetching orders:', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
