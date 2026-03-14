'use client'
import { useState, useEffect, useRef } from 'react'
import {
	CheckIcon,
	CreditCardIcon,
	BookmarkIcon,
	ShieldCheckIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useRouter } from '@/navigation'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { nanoid } from 'nanoid'
import Loader from '../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocale, useTranslations } from 'next-intl'
import PaymentPage from './PayForm'

const localizedCopy = {
	ua: {
		fieldLabels: {
			firstName: 'Імʼя*',
			lastName: 'Прізвище*',
			phone: 'Телефон*',
			email: 'Email*',
		},
		summaryTitle: 'Перевірте дані перед оплатою',
		secureRedirect: 'Після підтвердження ми підготуємо захищений перехід до WayForPay.',
		checkbox: 'Я перевірив дані та готовий перейти до оплати',
		confirm: 'Підтвердити дані',
		confirmed: 'Дані підтверджено',
		ready: 'Платіж готовий. Можна переходити до безпечної сторінки оплати.',
		paymentStep: 'Крок 2. Оплата через WayForPay',
		back: 'Повернутися до замовлення',
		quantityOne: '1 шт.',
		secureNote: 'Захищена оплата через WayForPay.',
		errors: {
			firstNameMax: 'Імʼя має бути до 15 символів',
			firstNameMin: 'Введіть коректне імʼя',
			firstNameRequired: 'Імʼя є обовʼязковим',
			lastNameMax: 'Прізвище має бути до 20 символів',
			lastNameMin: 'Введіть коректне прізвище',
			lastNameRequired: 'Прізвище є обовʼязковим',
			emailInvalid: 'Некоректний email',
			emailRequired: 'Email є обовʼязковим',
			phoneInvalid: 'Некоректний формат телефону',
			phoneRequired: 'Телефон є обовʼязковим',
		},
	},
	uk: {
		fieldLabels: {
			firstName: 'Імʼя*',
			lastName: 'Прізвище*',
			phone: 'Телефон*',
			email: 'Email*',
		},
		summaryTitle: 'Перевірте дані перед оплатою',
		secureRedirect: 'Після підтвердження ми підготуємо захищений перехід до WayForPay.',
		checkbox: 'Я перевірив дані та готовий перейти до оплати',
		confirm: 'Підтвердити дані',
		confirmed: 'Дані підтверджено',
		ready: 'Платіж готовий. Можна переходити до безпечної сторінки оплати.',
		paymentStep: 'Крок 2. Оплата через WayForPay',
		back: 'Повернутися до замовлення',
		quantityOne: '1 шт.',
		secureNote: 'Захищена оплата через WayForPay.',
		errors: {
			firstNameMax: 'Імʼя має бути до 15 символів',
			firstNameMin: 'Введіть коректне імʼя',
			firstNameRequired: 'Імʼя є обовʼязковим',
			lastNameMax: 'Прізвище має бути до 20 символів',
			lastNameMin: 'Введіть коректне прізвище',
			lastNameRequired: 'Прізвище є обовʼязковим',
			emailInvalid: 'Некоректний email',
			emailRequired: 'Email є обовʼязковим',
			phoneInvalid: 'Некоректний формат телефону',
			phoneRequired: 'Телефон є обовʼязковим',
		},
	},
	ru: {
		fieldLabels: {
			firstName: 'Имя*',
			lastName: 'Фамилия*',
			phone: 'Телефон*',
			email: 'Email*',
		},
		summaryTitle: 'Проверьте данные перед оплатой',
		secureRedirect: 'После подтверждения мы подготовим защищенный переход в WayForPay.',
		checkbox: 'Я проверил данные и готов перейти к оплате',
		confirm: 'Подтвердить данные',
		confirmed: 'Данные подтверждены',
		ready: 'Платеж готов. Можно переходить на защищенную страницу оплаты.',
		paymentStep: 'Шаг 2. Оплата через WayForPay',
		back: 'Вернуться к заказу',
		quantityOne: '1 шт.',
		secureNote: 'Защищенная оплата через WayForPay.',
		errors: {
			firstNameMax: 'Имя должно быть до 15 символов',
			firstNameMin: 'Введите корректное имя',
			firstNameRequired: 'Имя обязательно',
			lastNameMax: 'Фамилия должна быть до 20 символов',
			lastNameMin: 'Введите корректную фамилию',
			lastNameRequired: 'Фамилия обязательна',
			emailInvalid: 'Некорректный email',
			emailRequired: 'Email обязателен',
			phoneInvalid: 'Некорректный формат телефона',
			phoneRequired: 'Телефон обязателен',
		},
	},
	en: {
		fieldLabels: {
			firstName: 'First name*',
			lastName: 'Last name*',
			phone: 'Phone*',
			email: 'Email*',
		},
		summaryTitle: 'Review your details before payment',
		secureRedirect: 'After confirmation, we will prepare a secure redirect to WayForPay.',
		checkbox: 'I have checked my details and I am ready to continue to payment',
		confirm: 'Confirm details',
		confirmed: 'Details confirmed',
		ready: 'Payment is ready. You can continue to the secure payment page.',
		paymentStep: 'Step 2. Pay with WayForPay',
		back: 'Back to order',
		quantityOne: '1 item',
		secureNote: 'Secure payment via WayForPay.',
		errors: {
			firstNameMax: 'First name must be 15 characters or less',
			firstNameMin: 'Enter a valid first name',
			firstNameRequired: 'First name is required',
			lastNameMax: 'Last name must be 20 characters or less',
			lastNameMin: 'Enter a valid last name',
			lastNameRequired: 'Last name is required',
			emailInvalid: 'Invalid email',
			emailRequired: 'Email is required',
			phoneInvalid: 'Invalid phone format',
			phoneRequired: 'Phone is required',
		},
	},
}

const CustomField = ({ label, name, type, onEdit }) => (
	<div className='relative group'>
		<label
			htmlFor={name}
			className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-sm group-hover:text-blue-200/80'
		>
			{label}
		</label>
		<Field
			id={name}
			name={name}
			type={type}
			onInput={onEdit}
			className='bg-inherit border border-slate-500 rounded-lg px-3 outline-none text-slate-200 h-12 w-full text-sm group-hover:border-blue-200/80'
		/>
		<ErrorMessage name={name}>
			{(msg) => <div className='text-red-400 text-sm'>{msg}</div>}
		</ErrorMessage>
	</div>
)

const Payments = () => {
	const locale = useLocale()
	const copy = localizedCopy[locale] || localizedCopy.ua
	const validationSchema = Yup.object({
		firstName: Yup.string()
			.max(15, copy.errors.firstNameMax)
			.min(2, copy.errors.firstNameMin)
			.required(copy.errors.firstNameRequired),
		lastName: Yup.string()
			.max(20, copy.errors.lastNameMax)
			.min(2, copy.errors.lastNameMin)
			.required(copy.errors.lastNameRequired),
		email: Yup.string()
			.email(copy.errors.emailInvalid)
			.required(copy.errors.emailRequired),
		phone: Yup.string()
			.matches(/^[+]?[\d\s-()]+$/, copy.errors.phoneInvalid)
			.required(copy.errors.phoneRequired),
	})

	const [loading, setLoading] = useState(false)
	const [customerData, setCustomerData] = useState(null)
	const [paymentData, setPaymentData] = useState(null)
	const [userData, setUserData] = useState(null)
	const [isChecked, setIsChecked] = useState(false)
	const { orderPrice, orderTitle, id, authUser, orderId } = useSelector(
		(state) => state.counter
	)
	const router = useRouter()
	const t = useTranslations('Order')
	const { current } = useRef(nanoid())

	useEffect(() => {
		const fetchUserData = async () => {
			if (!authUser) return

			try {
				const userRef = doc(db, 'users', id)
				const userSnapshot = await getDoc(userRef)
				if (userSnapshot.exists()) {
					setUserData(userSnapshot.data())
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, [authUser, id])

	useEffect(() => {
		if (!orderTitle || !orderPrice || !orderId) {
			router.replace('/')
		}
	}, [orderTitle, orderPrice, orderId, router])

	const handleCheckout = async (values) => {
		const normalized = {
			...values,
			email: values.email.toLowerCase(),
		}
		const orderReference = current + orderId
		const orderDate = Math.floor(Date.now() / 1000)
		const userDocRef = doc(db, 'order', orderReference)
		const orderData = {
			...normalized,
			orderNumber: orderReference,
			orderPrice,
			orderTitle,
			timeStamp: serverTimestamp(),
			id,
			emailSent: false,
		}

		setLoading(true)
		try {
			await setDoc(userDocRef, orderData, { merge: true })

			const response = await fetch('/api/createorder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					orderId: orderReference,
					price: orderPrice,
					productName: orderTitle,
					data: orderDate,
					customer: normalized,
					locale,
				}),
			})

			const result = await response.json()
			if (!response.ok || !result.paymentData) {
				throw new Error(result.message || 'Failed to create payment')
			}

			setCustomerData(normalized)
			setPaymentData(result.paymentData)
			toast.success(copy.confirmed)
		} catch (error) {
			console.error('Checkout error:', error)
			toast.error(error.message || 'Unexpected error occurred. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	if (!orderTitle || !orderPrice || !orderId) {
		return null
	}

	const resetPreparedPayment = () => {
		if (!paymentData && !customerData) return
		setPaymentData(null)
		setCustomerData(null)
	}

	return (
		<div className='min-w-screen h-fit bg-transparent flex justify-center px-4 md:px-5 mt-8 md:mt-10 z-50'>
			{loading && <Loader />}
			<ToastContainer />
			<div className='w-full max-w-xl mx-auto rounded-2xl bg-transparent shadow1 p-4 md:p-6 text-gray-700'>
				<div className='flex-1 relative rounded-2xl border border-white/10 bg-black/10 p-4 md:p-6'>
					<div className='w-full text-center text-slate-400 font-semibold text-sm md:text-base'>
						{t('title')}
						<div className='mt-2 text-white text-lg md:text-2xl font-bold tracking-[0.02em] break-all'>
							{current + orderId}
						</div>
					</div>
					<p className='mt-3 text-center text-sm md:text-base text-zinc-300'>
						{copy.summaryTitle}
					</p>
					<p className='mt-2 text-center text-xs md:text-sm text-zinc-500'>
						{copy.secureRedirect}
					</p>
					<div className='mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-3'>
						<div className='flex items-start gap-3'>
							<ShieldCheckIcon className='h-5 w-5 text-emerald-400 shrink-0 mt-0.5' />
							<div>
								<p className='text-sm md:text-base font-semibold text-zinc-100'>
									WayForPay Secure Checkout
								</p>
								<p className='mt-1 text-xs md:text-sm text-zinc-400'>
									{copy.secureNote}
								</p>
							</div>
						</div>
					</div>

					<div className='mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4 space-y-4'>
						<div className='flex gap-3 text-[#e2a550] font-semibold'>
							<CheckIcon className='h-6 w-6 text-green-500 shrink-0' />
							<span>{orderTitle}</span>
						</div>
						<div className='text-white flex gap-3'>
							<BookmarkIcon className='h-6 w-6 text-green-500 shrink-0' />
							<span>{t('quantity')}</span>
							<span>{copy.quantityOne}</span>
						</div>
						<div className='text-white flex gap-3'>
							<CreditCardIcon className='h-6 w-6 text-green-500 shrink-0' />
							<span>{t('price')}</span>
							<span>{orderPrice} ₴</span>
						</div>
					</div>

					<Formik
						enableReinitialize
						initialValues={{
							firstName: userData?.firstName || '',
							lastName: userData?.lastName || '',
							phone: userData?.phone || '',
							email: userData?.email || '',
						}}
						validationSchema={validationSchema}
						validateOnChange
						validateOnBlur
						onSubmit={async (values, { setSubmitting }) => {
							await handleCheckout(values)
							setSubmitting(false)
						}}
					>
						{({ isSubmitting, isValid, dirty }) => (
							<Form className='flex flex-col pt-8 mx-auto gap-6 justify-start relative'>
								<CustomField
									label={copy.fieldLabels.firstName}
									name='firstName'
									type='text'
									onEdit={resetPreparedPayment}
								/>
								<CustomField
									label={copy.fieldLabels.lastName}
									name='lastName'
									type='text'
									onEdit={resetPreparedPayment}
								/>
								<CustomField
									label={copy.fieldLabels.phone}
									name='phone'
									type='text'
									onEdit={resetPreparedPayment}
								/>
								<CustomField
									label={copy.fieldLabels.email}
									name='email'
									type='email'
									onEdit={resetPreparedPayment}
								/>

								<label className='flex items-start gap-3 cursor-pointer text-slate-300'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={(event) => {
											setIsChecked(event.target.checked)
											if (!event.target.checked) {
												resetPreparedPayment()
											}
										}}
										className='mt-1 h-5 w-5 rounded border-zinc-600 bg-transparent accent-[#e2a550]'
									/>
									<span className='text-sm md:text-base'>{copy.checkbox}</span>
								</label>

								<button
									type='submit'
									disabled={
										!isChecked ||
										!isValid ||
										(!dirty && !userData) ||
										isSubmitting ||
										loading
									}
									className='w-full rounded-2xl border border-[#e2a550] bg-[#e2a550]/10 px-6 py-3 text-lg md:text-xl text-[#e2a550] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e2a550]/20 duration-300'
								>
									{copy.confirm}
								</button>
							</Form>
						)}
					</Formik>

					{paymentData && customerData && (
						<div className='mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 md:p-5'>
							<div className='flex items-start gap-3 text-emerald-300'>
								<CheckIcon className='h-6 w-6 shrink-0' />
								<div>
									<p className='font-semibold'>{copy.confirmed}</p>
									<p className='mt-1 text-sm text-zinc-300'>{copy.ready}</p>
								</div>
							</div>
							<div className='mt-4 text-sm uppercase tracking-[0.08em] text-zinc-400'>
								{copy.paymentStep}
							</div>
							<div className='mt-4 flex justify-center'>
								<PaymentPage paymentData={paymentData} titleButton={t('button')} />
							</div>
						</div>
					)}

					<div className='flex justify-center w-full mt-8'>
						<button
							onClick={() => router.back()}
							className='py-2 flex items-center gap-2 text-slate-400 z-10 text-center text-base md:text-lg hover:text-slate-300'
						>
							<ArrowTopRightOnSquareIcon className='h-5 w-5 rotate-180' />
							{copy.back}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payments
