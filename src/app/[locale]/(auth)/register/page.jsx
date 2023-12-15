'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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

const Register = () => {
	const id = useSelector((state) => state.counter.id)
	useEffect(() => {
		if (id) {
			redirect('/')
		}
	}, [id])

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
							.max(64, 'Should be 64 chars maximum.')
							.email('Invalid email')
							.required('Your Email Is Required!'),
						password: Yup.string()
							.required('No password provided.')
							.min(8, 'Should be 8 chars minimum.')
							.matches(/[a-zA-Z]/, 'Only contain Latin letters.'),
					})}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						let { email, password } = values
						const { result, error } = await signUp(email, password)

						if (error) {
							return toast.error('User not found')
						}
						// toast.success('Success Notification !')
						setSubmitting(false)
						resetForm()
						// else successful

						return router.push('/')
					}}
				>
					<Form className='flex flex-col w-[300px] gap-5 lg:mt-32'>
						<div className='relative group'>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
								{true ? 'Username' : "Ім'я користувача"}
							</p>
							<Field
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
								{true ? 'Email' : 'Електронна пошта'}
							</p>
							<Field
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
								{true ? 'Password' : 'Пароль'}
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
							{true ? 'Sign Up' : 'Зареєструватися'}
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
					{true ? '	Sign In with Google' : 'Зареєструватися за допомогою Google'}
				</button>

				<div className='flex space-x-3'>
					<p className='text-slate-400 text-[10px]'>
						{true ? 'Already registered?' : 'Вже маєте аккаунт?'}
					</p>
					<Link className='text-blue-200/80 text-[10px] z-10' href='/login'>
						{true ? 'Sign In' : 'Увійти'}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
