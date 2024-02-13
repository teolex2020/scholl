'use client'
import { useEffect } from 'react'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { getAuth } from 'firebase/auth'
import firebase_app from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { Authuser, Loading, Id } from './features/counterSlice'
import { PersistGate } from 'redux-persist/integration/react'


export const MyComponent = () => {
	const dispatch = useDispatch()
	const auth = getAuth(firebase_app)


	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {

			dispatch(Loading(false))
				dispatch(Authuser(user?.emailVerified))
				dispatch(Id(user?.uid))
		  

				// Диспатч Redux Action тут
			} else {
				console.log('User is not logged in')
			}
		})

		return () => unsubscribe()
	}, [auth, dispatch])
}

export async function Providers({ children={} }) {


	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MyComponent />
				{children}
			</PersistGate>
		</Provider>
	)
}
