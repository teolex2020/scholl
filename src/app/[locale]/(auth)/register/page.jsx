'use client'
import { useState, useEffect } from 'react'
import { Link } from '@/navigation'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter, redirect } from 'next/navigation'
import { EyeIcon } from '@heroicons/react/24/solid'
import { EyeSlashIcon } from '@heroicons/react/24/solid'
import signUp from '../../../../firebase/auth/singup.js'
import { auth, Providers } from '../../../../firebase/config.js'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

const Register = () => {
	const t = useTranslations('Login')
	const authUser = useSelector((state) => state.counter.authUser)
	useEffect(() => {
		if (authUser) {
			redirect('/')
		}
	}, [authUser])

	const [inputType, setInputType] = useState(true)

	const router = useRouter()

	const signupWithGoogle = () => {
		signInWithPopup(auth, Providers)
			.then((result) => {
			
				toast.success('Success Notification !')
				return router.push('/')
			})
			.catch((error) => {
				// Handle Errors here.
				toast.error('User not found')
			})
	}

	return (
		<div className='flex justify-center items-center h-screen lg:h-full  '>
			<ToastContainer position='top-right' autoClose={1000} />
			<div className=' flex flex-col gap-3 items-center p-5 '>
				<Formik
					initialValues={{
						name: '',
						email: '',
						password: '',
					}}
					validationSchema={Yup.object({
						name: Yup.string()
							.max(64, 'Should be 64 chars maximum.')
							.required('Your Name Is Required!'),
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
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						let { email, password } = values
						const { result, error } = await signUp(email, password)

						if (error) {
							return toast.error(
								'This email address is already in use by another account.'
							)
						}
						toast.success('Success Notification !')
						setSubmitting(false)
						resetForm()
						// else successful

						return router.push('/login')
					}}
				>
					<Form className='flex flex-col w-[300px] gap-5 lg:mt-32'>
						<div className='relative group'>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{t('user')}
							</p>
							<Field
								autocomplete='off'
								name='name'
								type='text'
								className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full group-hover:border-blue-200/80'
							/>
							<ErrorMessage name='name'>
								{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
							</ErrorMessage>
						</div>
						<div className='relative group'>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2  flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{t('email')}
							</p>
							<Field
								autocomplete='off'
								name='email'
								type='email'
								className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full group-hover:border-blue-200/80'
							/>
							<ErrorMessage name='email'>
								{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
							</ErrorMessage>
						</div>
						<div className='relative group '>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{t('password')}
							</p>
							<div
								onClick={() => setInputType(!inputType)}
								className='absolute right-5 top-3 opacity-60'
							>
								{inputType ? (
									<EyeSlashIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
								) : (
									<EyeIcon className='h-5 w-5 stroke-slate-100 fill-none stroke-[1.4px]' />
								)}
							</div>
							<Field
								autocomplete='off'
								name='password'
								type={inputType ? 'password' : 'text'}
								className='bg-transparent border border-slate-500 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full group-hover:border-blue-200/80'
							/>
							<ErrorMessage name='password'>
								{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
							</ErrorMessage>
						</div>

						<button
							type='submit'
							className='bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full   hover:border-blue-200/80 z-10'
						>
							{t('signup')}
						</button>
					</Form>
				</Formik>
				<div className='  w-full  text-ms flex justify-center items-center gap-3 text-slate-500'>
					<hr className='border-1 border-slate-600 w-full' />
					or <hr className='border-1 border-slate-600 w-full' />
				</div>
				<button
					onClick={signupWithGoogle}
					className='bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full  hover:border-blue-200/80 z-10'
				>
					{t('signingoogle')}
				</button>

				<div className='flex space-x-3'>
					<p className='text-slate-400 text-[10px]'> {t('already')}</p>
					<Link className='text-blue-200/80 text-[10px] z-10' href='/login'>
						{t('signin')}
					</Link>
				</div>
				<div className='text-[10px] text-slate-400 z-10'>
					{t('agree')}
					<div>
						<Link href='/teamofservise'>
							<span className='underline cursor-pointer'>{t('service')}</span>
						</Link>
						<span> & </span>{' '}
						<Link href='/privatpolicy'>
							<span className='underline cursor-pointer'>{t('policy')}</span>
						</Link>
						<br />
						<span> & </span>
						<Link href='/publicofer'>
							<span className='underline cursor-pointer'>{t('offer')}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
