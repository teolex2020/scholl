import admin from 'firebase-admin'

function formatPrivatKey(key) {
	return key.replace(/\\n/g, '\n')
}

export function createFirebaseAdminApp(params) {
	const privateKey = formatPrivatKey(params.privateKey)

	if (admin.apps.length > 0) {
		return admin.app()
	}

	const cert = admin.credential.cert({
		projectId: params.projectId,
		clientEmail: params.clientEmail,
		privateKey,
	})

	return admin.initializeApp({
		credential: cert,
		projectId: params.projectId,
    storageBucket: params.storageBucket
	})
}

export async function initAdmin(){
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
  }
  return createFirebaseAdminApp(params)
}