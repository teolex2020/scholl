import { NextResponse } from 'next/server'
import { firestore } from 'firebase-admin'
import { initAdmin } from '@/firebase/db/firebaseAdmin'

export async function POST(req) {
	try {
		const data = await req.json()
    
		const {
			orderReference,
			reason,
			clientName,
			processingDate,
			
			userdata,
		} = data
     
		await initAdmin()
		await firestore().collection('order').doc(orderReference).update({
			orderReference: orderReference,
			reason: reason,
			clientName: clientName,
			processingDate: processingDate,
		
		})

		return NextResponse.json({ messages: 'success' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
