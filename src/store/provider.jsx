'use client'
import { useEffect } from 'react'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { getAuth } from 'firebase/auth'
import firebase_app from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { Authuser, Loading, Id } from './features/counterSlice'
import { PersistGate } from 'redux-persist/integration/react'

// console.log('key', process.env.NEXT_PUBLIC_SITE_KEY)

export const MyComponent = () => {
	const dispatch = useDispatch()
	const auth = getAuth(firebase_app)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				
				dispatch(Loading(false))
				dispatch(Authuser(!!user))
				dispatch(Id(user?.uid))
			} else {
				console.info('User is not logged in')
			}
		})
		

		return () => unsubscribe()
	}, [auth, dispatch])
}

export  function Providers({ children = {} }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MyComponent />
				{children}
			</PersistGate>
		</Provider>
	)
}
