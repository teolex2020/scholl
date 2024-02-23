import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
	const {userId} = await req.json()
	
	try {
		await initAdmin()
		const firestore = getFirestore()
		const linkSnapshot = await firestore
			.collection('order')
			.where('id', '==', userId)
			.get()

		const documents = linkSnapshot.docs.map((link) => ({
			
			title: link.data().orderTitle,
			reason: link.data().reason,
		}))

		

		return NextResponse.json({ data: documents }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
