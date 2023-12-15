'use client'
import { useEffect } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { getAuth } from 'firebase/auth'
import firebase_app from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { Authuser, Loading, Id } from './features/counterSlice'



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

export async function Providers({ children }) {


	return (
		<Provider store={store} >
			<MyComponent />
			{children}
		</Provider>
	)
}
