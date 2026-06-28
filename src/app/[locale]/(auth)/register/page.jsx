// Для кращої структури проєкту рекомендується рознести ці блоки по окремих файлах:
// /components/Register/index.js (компонент)
// /components/Register/useRegister.js (хук)
// /components/Register/validation.js (валідація)

'use client'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { useRouter, Link } from '@/navigation' // [ЗМІНА] Використовуємо useRouter з @/navigation для редиректів
import { toast } from 'react-toastify'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

import signUp from '../../../../firebase/auth/singup.js'
import { auth, Providers } from '../../../../firebase/config.js'
import { signInWithPopup } from 'firebase/auth'
import AuthShell from '@/app/components/auth/AuthShell'
import GoogleIcon from '@/app/components/auth/GoogleIcon'

// [НОВЕ] Схема валідації винесена в окрему функцію для чистоти коду та i18n
const getRegisterValidationSchema = (t) =>
	Yup.object({
		name: Yup.string()
			.max(64, t('validation.nameMax'))
			.required(t('validation.nameRequired')),
		email: Yup.string()
			.max(254, t('validation.emailMax')) // [ЗМІНА] Збільшено ліміт для email до стандартного
			.email(t('validation.emailInvalid'))
			.required(t('validation.emailRequired')),
		password: Yup.string()
			.min(8, t('validation.passwordMin'))
			.matches(/^(?=.*[a-zA-Z]).{8,}$/, t('validation.passwordPattern'))
			.required(t('validation.passwordRequired')),
	})

// [НОВЕ] Вся логіка компонента інкапсульована в кастомному хуці
const useRegister = () => {
	// [ЗМІНА] Використовуємо простір імен 'Register' для більшої логічності
	const t = useTranslations('Login')
	const router = useRouter()
	const authUser = useSelector((state) => state.counter.authUser)
	const [isPasswordVisible, setPasswordVisible] = useState(false)

	// [ЗМІНА] Використовуємо router.replace для безпечного редиректу в клієнтському компоненті
	useEffect(() => {
		if (authUser) {
			router.replace('/')
		}
	}, [authUser, router])

	const handleRegister = async (values, { setSubmitting, resetForm }) => {
		const { email, password } = values
		try {
			const { result, error } = await signUp(email, password)

			if (error) {
				// [ЗМІНА] Покращена обробка помилок
				const errorMessage =
					error.code === 'auth/email-already-in-use'
						? t('error.emailInUse')
						: t('error.default')
				toast.error(errorMessage)
			} else if (result) {
				toast.success(t('success.accountCreated'))
				resetForm()
				router.push('/login')
			}
		} catch (e) {
			console.error('Registration failed:', e)
			toast.error(t('error.default'))
		} finally {
			setSubmitting(false)
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			await signInWithPopup(auth, Providers.google)
			toast.success(t('success.googleLogin'))
			router.push('/')
		} catch (error) {
			console.error('Google Sign-In failed:', error)
			toast.error(t('error.googleFailed'))
		}
	}

	// [ЗМІНА] Використовуємо хук useFormik замість компонента <Formik>
	const formik = useFormik({
		initialValues: { name: '', email: '', password: '' },
		validationSchema: getRegisterValidationSchema(t),
		onSubmit: handleRegister,
	})

	return {
		t,
		formik,
		isPasswordVisible,
		togglePasswordVisibility: () => setPasswordVisible((prev) => !prev),
		handleGoogleSignIn,
	}
}

// [ЗМІНА] Компонент тепер відповідає тільки за відображення UI
const Register = () => {
	const {
		t,
		formik,
		isPasswordVisible,
		togglePasswordVisibility,
		handleGoogleSignIn,
	} = useRegister()

	const inputClass =
		'bg-inherit border border-slate-600 rounded-lg px-3 outline-none text-slate-200 h-12 w-full text-base focus:border-[#e2a550] transition-colors'
	const labelClass =
		'absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-focus-within:text-[#e2a550]'

	return (
		<AuthShell t={t}>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-100'>{t('signup')}</h1>
				<p className='text-slate-400 text-sm mt-2'>{t('registerSubtitle')}</p>
			</div>

			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
				{/* Поле Ім'я */}
				<div className='relative group'>
					<label htmlFor='name' className={labelClass}>
						{t('user')}
					</label>
					<input
						id='name'
						type='text'
						autoComplete='name'
						className={inputClass}
						{...formik.getFieldProps('name')}
					/>
					{formik.touched.name && formik.errors.name && (
						<div className='text-red-400 text-xs pt-1 pl-1'>
							{formik.errors.name}
						</div>
					)}
				</div>

				{/* Поле Email */}
				<div className='relative group'>
					<label htmlFor='email' className={labelClass}>
						{t('email')}
					</label>
					<input
						id='email'
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
					<label htmlFor='password' className={labelClass}>
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
						type={isPasswordVisible ? 'text' : 'password'}
						autoComplete='new-password'
						className={`${inputClass} pr-12`}
						{...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password && (
						<div className='text-red-400 text-xs pt-1 pl-1'>
							{formik.errors.password}
						</div>
					)}
				</div>

				<button
					type='submit'
					disabled={formik.isSubmitting}
					className='w-full rounded-xl bg-[#e2a550] hover:bg-[#d29440] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-lg py-3.5 duration-300'
				>
					{formik.isSubmitting ? t('loading') : t('signup')}
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
				{t('already')}{' '}
				<Link className='text-[#e2a550] font-semibold hover:underline' href='/login'>
					{t('signin')}
				</Link>
			</p>
		</AuthShell>
	)
}

export default Register
