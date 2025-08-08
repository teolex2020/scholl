

'use client'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { useRouter, Link } from '@/navigation'
import { toast } from 'react-toastify'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

import signIn from '../../../../firebase/auth/signin'
import { auth, Providers } from '../../../../firebase/config.js'
import { signInWithPopup } from 'firebase/auth'

// --- 1. Допоміжна функція для обробки помилок Firebase ---
const getFirebaseAuthErrorMessage = (error, t) => {
	switch (error.code) {
		case 'auth/user-not-found':
		case 'auth/wrong-password':
		case 'auth/invalid-credential':
			return t('error.invalidCredentials')
		case 'auth/too-many-requests':
			return t('error.tooManyRequests')
		default:
			console.error('Firebase Sign In Error:', error) // Для розробника
			return t('error.default')
	}
}

// --- 2. Схема валідації ---
const getLoginValidationSchema = (t) =>
	Yup.object({
		email: Yup.string()
			.max(254, t('validation.emailTooLong'))
			.email(t('validation.invalidEmail'))
			.required(t('validation.emailRequired')),
		password: Yup.string()
			.min(8, t('validation.passwordMinLength'))
			.matches(/^(?=.*[a-zA-Z]).{8,}$/, t('validation.passwordPattern'))
			.required(t('validation.passwordRequired')),
	})

// --- 3. Кастомний хук з усією логікою ---
const useLogin = () => {
	const t = useTranslations('Login')
	const router = useRouter()
	const authUser = useSelector((state) => state.counter.authUser)

	const [isPasswordVisible, setPasswordVisible] = useState(false)

	// Редирект, якщо користувач вже увійшов
	useEffect(() => {
		if (authUser) {
			router.replace('/')
		}
	}, [authUser, router])

	const handleLogin = async (values, { setSubmitting }) => {
		const { email, password } = values
		try {
			const { result, error } = await signIn(email, password)

			if (result) {
				toast.success(t('success.login'))
				router.push('/')
			} else if (error) {
				const userMessage = getFirebaseAuthErrorMessage(error, t)
				toast.error(userMessage)
			} else {
				// Рідкісний випадок, коли signIn не повертає ні result, ні error
				toast.error(t('error.noResult'))
			}
		} catch (exception) {
			console.error('Exception during sign in process:', exception)
			toast.error(t('error.exception'))
		} finally {
			setSubmitting(false)
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			await signInWithPopup(auth, Providers.google) // Важливо вказати провайдера
			toast.success(t('success.login'))
			router.push('/')
		} catch (error) {
			toast.error(error?.message || t('error.googleSignInFailed'))
		}
	}

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: getLoginValidationSchema(t),
		onSubmit: handleLogin,
	})

	return {
		t,
		formik,
		isPasswordVisible,
		togglePasswordVisibility: () => setPasswordVisible((prev) => !prev),
		handleGoogleSignIn,
	}
}

// --- 4. Компонент, що відповідає лише за відображення ---
const Login = () => {
	const {
		t,
		formik,
		isPasswordVisible,
		togglePasswordVisibility,
		handleGoogleSignIn,
	} = useLogin()

	return (
		<div className='flex justify-center h-screen lg:h-full'>
			<div className='flex flex-col gap-3 items-center p-5'>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col w-[300px] gap-5 lg:mt-32'
				>
					<p className='w-full text-center text-3xl font-extrabold text-blue-200/80'>
						{t('signin')}
					</p>

					{/* Поле Email */}
					<div className='relative group'>
						<label
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-hover:text-blue-200/80'
							htmlFor='email'
						>
							{t('email')}
						</label>
						<input
							id='email'
							name='email'
							type='email'
							className='bg-[#11171c] border border-slate-500 rounded-sm px-3 outline-none text-slate-200 h-12 w-full text-sm group-hover:border-blue-200/80'
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className='text-red-500 text-sm'>{formik.errors.email}</div>
						)}
					</div>

					{/* Поле Пароль */}
					<div className='relative group'>
						<label
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] px-2 text-[14px] group-hover:text-blue-200/80'
							htmlFor='password'
						>
							{t('password')}
						</label>
						<div
							onClick={togglePasswordVisibility}
							className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer opacity-60'
						>
							{isPasswordVisible ? (
								<EyeSlashIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
							) : (
								<EyeIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
							)}
						</div>
						<input
							id='password'
							name='password'
							type={isPasswordVisible ? 'text' : 'password'}
							className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none text-slate-200 h-12 w-full group-hover:border-blue-200/80'
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password && (
							<div className='text-red-500 text-sm'>
								{formik.errors.password}
							</div>
						)}
					</div>

					<button
						type='submit'
						disabled={formik.isSubmitting}
						className='opacity-100 disabled:opacity-60 disabled:cursor-not-allowed bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none text-slate-400 h-12 w-full hover:border-blue-200/80 z-10'
					>
						{formik.isSubmitting ? t('loading') : t('signin')}
					</button>
				</form>

				<div className='w-full text-ms flex justify-center items-center gap-3 text-slate-500'>
					<hr className='border-1 border-slate-600 w-full' />
					{t('or')}
					<hr className='border-1 border-slate-600 w-full' />
				</div>

				<button
					onClick={handleGoogleSignIn}
					className='uppercase font-bold bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none text-slate-400 h-12 w-[300px] hover:border-blue-200/80 z-10'
				>
					{t('signingoogle')}
				</button>

				<div className='flex space-x-3 w-full text-center'>
					<p className='text-slate-400 text-sm'>{t('accoun')}</p>
					<Link className='text-blue-200/80 z-10' href='/register'>
						{t('signup')}
					</Link>
				</div>
				<div className='text-sm z-50 w-full text-blue-200/80'>
					<Link href='/forgot-password' className='underline cursor-pointer'>
						{t('forgotPassword')}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
