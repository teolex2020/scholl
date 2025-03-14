'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../../firebase/config'
import { useRouter } from 'next/navigation'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslations } from 'next-intl'

const ForgotPasswordPage = () => {
	const router = useRouter()
  	const t = useTranslations('Login')

	const handleResetPassword = async ({ email }) => {
		try {
			await sendPasswordResetEmail(auth, email)
			toast.success('Request password reset email sent!')
			router.push('/login')
		} catch (error) {
			toast.error('Authentication service is not available.')
		}
	}

	const validationSchema = Yup.object({
		 email: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .email('Invalid email address')
                    .required('Please enter your email'),
	})

	return (
		<div className='flex justify-center pt-[5%] h-screen'>
			<div className='p-5 w-full max-w-md'>
				<h2 className='text-slate-300  mb-4 text-center text-3xl '>
					{t('forgot')}
				</h2>

				<Formik
					initialValues={{ email: '' }}
					validationSchema={validationSchema}
					onSubmit={handleResetPassword}
				>
					<Form className='flex flex-col gap-4'>
						<div className='relative group'>
							<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] px-2 text-sm'>
								{t('email')}
							</p>
							<Field
								name='email'
								type='email'
								className='bg-[#11171c] border border-slate-500 rounded-sm px-3 outline-none text-slate-200 h-12 w-full text-sm'
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='text-red-500 text-sm mt-1'
							/>
						</div>

						<button
							type='submit'
							className='bg-transparent border border-slate-500 hover:border-slate-300 rounded-sm px-3 text-slate-400 h-12 w-full'
						>
							{t('reset')}
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	)
}

export default ForgotPasswordPage
