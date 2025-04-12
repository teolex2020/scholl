'use client'
import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import signIn from '../../../../firebase/auth/signin'
import { useRouter, redirect } from 'next/navigation'
import { Link } from '@/navigation'
import { EyeIcon } from '@heroicons/react/24/solid'
import { EyeSlashIcon } from '@heroicons/react/24/solid'
import { auth, Providers } from '../../../../firebase/config.js'
import { signInWithPopup } from 'firebase/auth'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

const Login = () => {
	const t = useTranslations('Login')
	const authUser = useSelector((state) => state.counter.authUser)

	useEffect(() => {
		if (authUser) {
			redirect('/')
		}
	}, [authUser])

	const [inputType, setInputType] = useState(true)

	const router = useRouter()

	const sign = async (values) => {
		let { email, password } = values
		// Можна додати індикатор завантаження, якщо хочете
		// const loadingToastId = toast.loading("Спроба входу...");

		try {
			// Припускаємо, що signIn імпортовано і працює як раніше
			const { result, error } = await signIn(email, password)
			// toast.dismiss(loadingToastId); // Закрити індикатор завантаження

			if (result) {
				// Успішний вхід - залишаємо як є
				toast.success('Вхід виконано успішно!')
				router.push('/')
			} else if (error) {
				// Помилка від Firebase (вже оброблялася, але можна уточнити повідомлення)
				console.error('Firebase Sign In Error:', error) // Залишаємо для себе в консолі (або для майбутнього логування)

				let userMessage = 'Не вдалося увійти. Перевірте пошту та пароль.' // Базове повідомлення

				// Можна додати більш специфічні повідомлення для поширених помилок, ЯКЩО ЦЕ БЕЗПЕЧНО
				if (
					error.code === 'auth/user-not-found' ||
					error.code === 'auth/wrong-password' ||
					error.code === 'auth/invalid-credential'
				) {
					userMessage = 'Неправильна пошта або пароль. Спробуйте ще раз.'
				} else if (error.code === 'auth/too-many-requests') {
					userMessage =
						'Доступ тимчасово заблоковано через велику кількість спроб. Спробуйте пізніше.'
				} else {
					// Для інших помилок Firebase краще залишити загальне повідомлення
					userMessage =
						'Під час входу сталася помилка сервера. Спробуйте пізніше.'
				}
				toast.error(userMessage) // Показуємо користувачу зрозумілу помилку
			} else {
			
				// Це коли signIn не повернув ні result, ні error
				console.warn('signIn did not return result or error', { email }) // Для себе в консолі
				toast.error(
					"Спроба входу не завершилась. Перевірте з'єднання та спробуйте знову. (Код: NRE)"
				) // NRE = No Result/Error
			}
		} catch (exception) {
			// toast.dismiss(loadingToastId); // Закрити індикатор завантаження

		
			console.error('Exception during sign in process:', exception) // Для себе в консолі
			toast.error(
				'Під час входу сталася несподівана помилка. Будь ласка, спробуйте ще раз. (Код: EXC)'
			) // EXC = Exception
		}
	}

	const signupWithGoogle = () => {
		signInWithPopup(auth, Providers)
			.then((result) => {
				toast.success('Success Notification !')
				return router.push('/')
			})
			.catch((error) => {
				// Handle Errors here.
				toast.error('User not login')
			})
	}

	return (
		<div className='flex justify-center   h-screen lg:h-full'>
			<div className=' flex flex-col gap-3 items-center p-5 '>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={Yup.object({
						email: Yup.string()
							.max(30, 'Must be 30 characters or less')
							.email('Invalid email address')
							.required('Please enter your email'),
						password: Yup.string()
							.required('Please enter your password')
							.min(8, 'Should be 8 chars minimum.')
							.matches(
								/^(?=.*[a-zA-Z]).{8,}$/,
								'Password must contain at least one Latin letter.'
							),
					})}
					onSubmit={sign}
				>
					<Form className='flex flex-col w-[300px] gap-5 lg:mt-32 '>
						<p className='w-full text-center text-3xl font-extrabold  text-blue-200/80'>
							{t('signin')}
						</p>
						<div className='relative group '>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{t('email')}
							</p>
							<Field
								style={{}}
								name='email'
								type='email'
								className='bg-[#11171c]  border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
							/>
							<ErrorMessage name='email'>
								{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
							</ErrorMessage>
						</div>
						<div className='relative group'>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c]  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{t('password')}
							</p>
							<div
								onClick={() => setInputType(!inputType)}
								className='absolute right-5 bottom-3 opacity-60'
							>
								{inputType ? (
									<EyeSlashIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
								) : (
									<EyeIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
								)}
							</div>
							<Field
								type={inputType ? 'password' : 'text'}
								name='password'
								className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full group-hover:border-blue-200/80'
							/>
						</div>
						<ErrorMessage name='password'>
							{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
						</ErrorMessage>
						<button
							type='submit'
							className='bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full   hover:border-blue-200/80 z-10'
						>
							{t('signin')}
						</button>
					</Form>
				</Formik>

				<div className='  w-full  text-ms flex justify-center items-center gap-3 text-slate-500'>
					<hr className='border-1 border-slate-600 w-full' />
					or <hr className='border-1 border-slate-600 w-full' />
				</div>
				<button
					onClick={signupWithGoogle}
					className='uppercase font-bold bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full  hover:border-blue-200/80 z-10'
				>
					{t('signingoogle')}
				</button>

				<div className='flex space-x-3 w-full'>
					<p className='text-slate-400 '>{t('accoun')}</p>
					<Link className='text-blue-200/80  z-10' href='/register'>
						{t('signup')}
					</Link>
				</div>
				<div className=' text-sm z-50 w-full text-blue-200/80'>
					<Link href={`/forgot-password`} className='underline cursor-pointer'>
						Forgot password?
					</Link>
				</div>
				{/* <div className='text-[10px] text-slate-400 z-10'>
					{t('agree')}
					<div>
						<Link href='/teamofservise'>
							<span className='underline cursor-pointer'>{t('service')}</span>
						</Link>
						<span> & </span>{' '}
						<Link href='/privatpolicy'>
							<span className='underline cursor-pointer'> {t('policy')}</span>
						</Link>
						<br />
						<span> & </span>
						<Link href='/publicofer'>
							<span className='underline cursor-pointer'>{t('offer')}</span>
						</Link>
					</div>
				</div> */}
			</div>
		</div>
	)
}

export default Login
