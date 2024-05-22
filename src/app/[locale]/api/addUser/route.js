import { NextResponse } from 'next/server'
import { getFirestore} from 'firebase-admin/firestore'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
	const { id, firstName, lastName, phone, email, data } = await req.json()

	try {
		await initAdmin()
		const firestore = getFirestore()
		await firestore.collection('users').doc(id).update(
			{
				firstName,
				lastName,
				phone,
				email,
				id,
				data,
			},
			{ merge: true }
		)

		return NextResponse.json({ message: 'Success' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'error' }, { status: 500 })
	}
}
