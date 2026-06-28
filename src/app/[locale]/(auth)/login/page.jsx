

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
import AuthShell from '@/app/components/auth/AuthShell'
import GoogleIcon from '@/app/components/auth/GoogleIcon'

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

	const inputClass =
		'bg-inherit border border-slate-600 rounded-lg px-3 outline-none text-slate-200 h-12 w-full text-base focus:border-[#e2a550] transition-colors'
	const labelClass =
		'absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-focus-within:text-[#e2a550]'

	return (
		<AuthShell t={t}>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-100'>{t('signin')}</h1>
				<p className='text-slate-400 text-sm mt-2'>{t('loginSubtitle')}</p>
			</div>

			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
				{/* Поле Email */}
				<div className='relative group'>
					<label className={labelClass} htmlFor='email'>
						{t('email')}
					</label>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						className={inputClass}
						{...formik.getFieldProps('email')}
					/>
					{formik.touched.email && formik.errors.email && (
						<div className='text-red-400 text-xs pt-1 pl-1'>
							{formik.errors.email}
						</div>
					)}
				</div>

				{/* Поле Пароль */}
				<div className='relative group'>
					<label className={labelClass} htmlFor='password'>
						{t('password')}
					</label>
					<div
						onClick={togglePasswordVisibility}
						className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100'
					>
						{isPasswordVisible ? (
							<EyeSlashIcon className='h-5 w-5 text-slate-300' />
						) : (
							<EyeIcon className='h-5 w-5 text-slate-300' />
						)}
					</div>
					<input
						id='password'
						name='password'
						type={isPasswordVisible ? 'text' : 'password'}
						autoComplete='current-password'
						className={`${inputClass} pr-12`}
						{...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password && (
						<div className='text-red-400 text-xs pt-1 pl-1'>
							{formik.errors.password}
						</div>
					)}
				</div>

				<div className='flex justify-end -mt-2'>
					<Link
						href='/forgot-password'
						className='text-sm text-[#e2a550] hover:underline'
					>
						{t('forgotPassword')}
					</Link>
				</div>

				<button
					type='submit'
					disabled={formik.isSubmitting}
					className='w-full rounded-xl bg-[#e2a550] hover:bg-[#d29440] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-lg py-3.5 duration-300'
				>
					{formik.isSubmitting ? t('loading') : t('signin')}
				</button>
			</form>

			<div className='flex items-center gap-3 text-slate-500 text-sm my-6'>
				<hr className='border-zinc-700 w-full' />
				{t('or')}
				<hr className='border-zinc-700 w-full' />
			</div>

			<button
				onClick={handleGoogleSignIn}
				className='w-full flex items-center justify-center gap-3 rounded-xl border border-slate-600 hover:border-slate-400 hover:bg-white/5 text-slate-200 font-semibold h-12 duration-300'
			>
				<GoogleIcon />
				{t('signingoogle')}
			</button>

			<p className='text-center text-sm text-slate-400 mt-8'>
				{t('accoun')}{' '}
				<Link className='text-[#e2a550] font-semibold hover:underline' href='/register'>
					{t('signup')}
				</Link>
			</p>
		</AuthShell>
	)
}

export default Login
