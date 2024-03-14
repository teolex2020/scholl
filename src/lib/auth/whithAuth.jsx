import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' // Виправлено з 'next/navigation' на 'next/router'
import firebase_app from '@/firebase/config'
import { getAuth } from 'firebase/auth' // шлях до вашої конфігурації Firebase

const withAuth = (WrappedComponent) => {
	const auth = getAuth(firebase_app)

	const AuthComponent = (props) => {
		// Додано ім'я функції 'AuthComponent'
		const Router = useRouter()
		const [isAuthenticated, setIsAuthenticated] = useState(false)

		useEffect(() => {
			auth.onAuthStateChanged((user) => {
				if (!user) {
					// Якщо користувач не аутентифікований, перенаправляємо на сторінку логіну
					Router.push('/login')
				} else {
					// Встановлюємо стан аутентифікації як true
					setIsAuthenticated(true)
				}
			})
		}, [Router])

		// Рендеримо компонент, якщо користувач аутентифікований
		return isAuthenticated ? <WrappedComponent {...props} /> : null
	}

	AuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})` // Додано displayName

	return AuthComponent
}

// Функція для отримання імені компонента
function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuth
