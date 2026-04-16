// Рекомендується рознести по файлах:
// /components/ForgotPassword/index.js (компонент)
// /components/ForgotPassword/useForgotPassword.js (хук)
// /components/ForgotPassword/validation.js (валідація)

'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../../firebase/config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslations } from 'next-intl'

// [НОВЕ] Схема валідації винесена в окрему функцію для i18n
const getValidationSchema = (t) =>
	Yup.object({
		email: Yup.string()
			.email(t('validation.emailInvalid'))
			.required(t('validation.emailRequired')),
	})

// [НОВЕ] Вся логіка винесена в кастомний хук
const useForgotPassword = () => {
	// [ЗМІНА] Створено окремий простір імен для цієї сторінки
	const t = useTranslations('ForgotPassword')

	const handleResetPassword = async (values, { setSubmitting }) => {
		const { email } = values
		try {
			await sendPasswordResetEmail(auth, email)
			toast.success('If an account with this email exists, a password reset email will arrive shortly.')
		} catch (error) {
			console.error('Password Reset Error:', error)
			// [ЗМІНА] Покращена обробка помилок
			const errorMessage =
				error.code === 'auth/invalid-email'
					? 'Please enter a valid email address.'
					: error.code === 'auth/too-many-requests'
						? 'Too many attempts. Please try again later.'
						: t('error.default')
			toast.error(errorMessage)
		} finally {
			// [ВИПРАВЛЕНО] Гарантуємо, що кнопка розблокується після запиту
			setSubmitting(false)
		}
	}

	// [ЗМІНА] Використання хука useFormik
	const formik = useFormik({
		initialValues: { email: '' },
		validationSchema: getValidationSchema(t),
		onSubmit: handleResetPassword,
	})

	return { t, formik }
}

// [ЗМІНА] Компонент відповідає лише за UI
const ForgotPasswordPage = () => {
	const { t, formik } = useForgotPassword()

	return (
		<div className='flex justify-center pt-[5%] h-screen'>
			<div className='p-5 w-full max-w-md'>
				<h2 className='text-slate-300 mb-4 text-center text-3xl'>
					{t('title')}
				</h2>

				<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
					<div className='relative group'>
						<label
							htmlFor='email'
							className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] px-2 text-sm'
						>
							{t('emailLabel')}
						</label>
						<input
							id='email'
							type='email'
							className='bg-[#11171c] border border-slate-500 rounded-sm px-3 outline-none text-slate-200 h-12 w-full text-sm'
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className='text-red-500 text-sm mt-1'>
								{formik.errors.email}
							</div>
						) : null}
					</div>

					<button
						type='submit'
						disabled={!formik.isValid || formik.isSubmitting}
						className='
        h-12 w-full rounded-sm border px-3
        transition-all duration-200 ease-in-out cursor-pointer z-10
        
        
        border-slate-400 bg-transparent text-slate-200
        hover:border-white hover:text-white
        
        
        disabled:border-slate-600 disabled:text-slate-500
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:border-slate-600 disabled:hover:text-slate-500
    '
					>
						{formik.isSubmitting ? t('loading') : t('resetButton')}
					</button>

					<p className='text-sm text-slate-400'>Check spam or promotions. If the account was created with Google, a reset email may not be available.</p>
				</form>
			</div>
		</div>
	)
}

export default ForgotPasswordPage
