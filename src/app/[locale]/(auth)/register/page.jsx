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

	return (
		<div className='flex justify-center h-screen lg:h-full'>
			<div className='flex flex-col gap-3 items-center p-5'>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col w-[300px] gap-5 lg:mt-32'
				>
					<p className='w-full text-center text-3xl font-extrabold text-blue-200/80'>
						{t('signup')}
					</p>

					{/* Поле Ім'я */}
					<div className='relative group'>
						<label
							htmlFor='name'
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-hover:text-blue-200/80'
						>
							{t('user')}
						</label>
						<input
							id='name'
							type='text'
							className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none text-slate-400 h-12 w-full group-hover:border-blue-200/80'
							{...formik.getFieldProps('name')}
						/>
						{formik.touched.name && formik.errors.name && (
							<div className='text-red-500 text-sm'>{formik.errors.name}</div>
						)}
					</div>

					{/* Поле Email */}
					<div className='relative group'>
						<label
							htmlFor='email'
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-hover:text-blue-200/80'
						>
							{t('email')}
						</label>
						<input
							id='email'
							type='email'
							className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none text-slate-400 h-12 w-full group-hover:border-blue-200/80'
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className='text-red-500 text-sm'>{formik.errors.email}</div>
						)}
					</div>

					{/* Поле Пароль */}
					<div className='relative group'>
						<label
							htmlFor='password'
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-hover:text-blue-200/80'
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
							type={isPasswordVisible ? 'text' : 'password'}
							className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none text-slate-400 h-12 w-full group-hover:border-blue-200/80'
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
						{formik.isSubmitting ? t('loading') : t('signup')}
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

				<div className='flex space-x-3 w-full'>
					<p className='text-slate-400'>{t('already')}</p>
					<Link className='text-blue-200/80 z-10' href='/login'>
						{t('signin')}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
