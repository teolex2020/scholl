import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
	const {userId} = await req.json()
	
		
	try {
		await initAdmin()
		const firestore = getFirestore()
		const linkSnapshot = await firestore
			.collection('users')
			.where('id', '==', userId)
			.get()

				

		if (!linkSnapshot.empty) {
			// Припускаємо, що id унікальний, тому беремо перший документ
			const userDoc = linkSnapshot.docs[0].data()

	

			return NextResponse.json({ data: userDoc }, { status: 200 })
		} else {
			// Користувача не знайдено
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
