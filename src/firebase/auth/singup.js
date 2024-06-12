import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

export default async function signUp(email, password) {
	let result = null,
		error = null
	try {
		result = await createUserWithEmailAndPassword(auth, email, password)
		await setDoc(doc(db, 'users', result.user.uid), {
			id: result.user.uid,
			email: result.user.email,
			roles: 'user', // або інша роль за замовчуванням
			createdAt: new Date().toISOString(),
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}
