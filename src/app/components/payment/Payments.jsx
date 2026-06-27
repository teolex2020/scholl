'use client'
import { useState, useEffect, useRef } from 'react'
import {
	CheckIcon,
	LockClosedIcon,
	ShoppingBagIcon,
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
import { useTranslations, useLocale } from 'next-intl'
import PaymentPage from './PayForm'

const CustomField = ({ label, name, type, autoComplete, inputMode, placeholder }) => (
	<div className='relative group'>
		<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-focus-within:text-[#e2a550]'>
			{label}
		</p>
		<Field
			name={name}
			type={type}
			autoComplete={autoComplete}
			inputMode={inputMode}
			placeholder={placeholder}
			className='bg-inherit border border-slate-500 rounded-lg px-3 outline-none text-slate-200 h-12 w-full text-base focus:border-[#e2a550] transition-colors placeholder:text-slate-600'
		/>
		<ErrorMessage name={name}>
			{(msg) => <div className='text-red-400 text-xs pt-1 pl-1'>{msg}</div>}
		</ErrorMessage>
	</div>
)

const Payments = () => {
	// orderDate фіксується один раз: це ж значення йде і в підпис, і у форму WayForPay
	const [orderDate] = useState(() => Date.now())
	const [loading, setLoading] = useState(false)
	const [redirecting, setRedirecting] = useState(false)
	const [payment, setPayment] = useState(null) // { pay, client } після отримання підпису
	const { orderPrice, orderTitle, id, authUser, orderId } = useSelector(
		(state) => state.counter
	)
	const router = useRouter()
	const t = useTranslations('Order')
	const locale = useLocale()
	const { current } = useRef(nanoid())
	const orderReference = current + orderId

	// null = ще вантажиться; форму рендеримо лише після завершення,
	// щоб довантажені дані не затирали введене користувачем
	const [prefill, setPrefill] = useState(null)

	useEffect(() => {
		let active = true
		const fetchUserData = async () => {
			let values = { firstName: '', lastName: '', phone: '', email: '' }
			if (authUser && id) {
				try {
					const userSnapshot = await getDoc(doc(db, 'users', id))
					if (userSnapshot.exists()) {
						const data = userSnapshot.data()
						values = {
							firstName: data.firstName || '',
							lastName: data.lastName || '',
							phone: data.phone || '',
							email: data.email || '',
						}
					}
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			}
			if (active) setPrefill(values)
		}
		fetchUserData()
		return () => {
			active = false
		}
	}, [authUser, id])

	const validationSchema = Yup.object({
		firstName: Yup.string()
			.min(2, t('tooShort'))
			.max(30, t('tooLong'))
			.required(t('required')),
		lastName: Yup.string()
			.min(2, t('tooShort'))
			.max(30, t('tooLong'))
			.required(t('required')),
		email: Yup.string().email(t('invalidEmail')).required(t('required')),
		phone: Yup.string()
			.matches(/^[+]?[\d\s\-()]{9,}$/, t('invalidPhone'))
			.required(t('required')),
	})

	const handleSubmit = async (values) => {
		setLoading(true)
		try {
			const client = {
				...values,
				email: values.email.toLowerCase().trim(),
				phone: values.phone.trim(),
			}

			await setDoc(
				doc(db, 'order', orderReference),
				{
					...client,
					orderNumber: orderReference,
					orderPrice: orderPrice,
					orderTitle: orderTitle,
					timeStamp: serverTimestamp(),
					id: id,
					emailSent: false,
				},
				{ merge: true }
			)

			const response = await fetch(`/${locale}/api/createorder`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					orderReference,
					productId: orderId,
					productName: orderTitle,
					orderDate,
					locale,
				}),
			})
			const pay = await response.json()
			if (!response.ok || pay.error || !pay.signature) {
				throw new Error(pay.message || 'Server error')
			}

			// Рендер PayForm автоматично сабмітить форму та перенаправить на WayForPay.
			// loading лишається true до самого редіректу
			setRedirecting(true)
			setPayment({ pay, client })
		} catch (error) {
			console.error('Payment error:', error)
			toast.error(t('serverError'))
			setLoading(false)
		}
	}

	// Захист від прямого заходу на /payment без обраного товару (напр. після F5)
	if (!orderId || !orderTitle) {
		return (
			<div className='flex flex-col items-center gap-6 mt-20 px-5'>
				<p className='text-slate-300 text-lg text-center'>{t('empty')}</p>
				<button
					onClick={() => router.push('/')}
					className='border-2 rounded-3xl border-[#e2a550] colorgold py-2 px-10 hover:bg-blur duration-300'
				>
					{t('emptyButton')}
				</button>
			</div>
		)
	}

	return (
		<div className='relative z-10 w-full min-h-[calc(100vh-80px)] bg-transparent flex flex-col items-center justify-center px-4 py-12'>
			{redirecting && <Loader />}
			<ToastContainer />
			<div className='w-full max-w-5xl mx-auto'>
				<h1 className='text-2xl lg:text-3xl text-slate-100 font-semibold text-center mb-2'>
					{t('checkout')}
				</h1>
				<div className='mx-auto mb-10 h-1 w-16 rounded-full bg-[#e2a550]' />

				<div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch'>
					{/* Підсумок замовлення */}
					<div className='lg:col-span-2 flex flex-col rounded-2xl bg-[#0d1217]/90 border border-zinc-800 shadow1 overflow-hidden'>
						<div className='bg-gradient-to-br from-[#e2a550]/15 to-transparent p-6 lg:p-8 border-b border-zinc-800'>
							<div className='flex items-center gap-2 text-[#e2a550] text-xs uppercase tracking-widest mb-4'>
								<ShoppingBagIcon className='h-4 w-4' />
								<span>{t('checkout')}</span>
							</div>
							<p className='text-slate-100 font-serif font-semibold text-xl lg:text-2xl leading-snug line-clamp-4'>
								{orderTitle}
							</p>
						</div>

						<div className='flex-1 flex flex-col p-6 lg:p-8 gap-5'>
							<div className='flex justify-between items-end'>
								<span className='text-slate-400'>{t('price')}</span>
								<span className='text-white text-4xl font-bold leading-none'>
									{orderPrice}
									<span className='text-2xl text-[#e2a550] ml-1'>₴</span>
								</span>
							</div>

							<div className='mt-auto space-y-3 pt-5 border-t border-zinc-800'>
								<div className='flex items-start gap-2 text-sm text-slate-400'>
									<CheckIcon className='h-5 w-5 shrink-0 text-green-500' />
									<span>{t('afterPay')}</span>
								</div>
								<div className='flex items-start gap-2 text-sm text-slate-400'>
									<LockClosedIcon className='h-5 w-5 shrink-0 text-green-500' />
									<span>{t('secure')}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Контактні дані */}
					<div className='lg:col-span-3 flex flex-col rounded-2xl bg-[#11171c]/90 border border-zinc-800 shadow1 p-6 lg:p-10'>
						<h2 className='text-slate-200 font-semibold text-lg mb-6'>
							{t('contacts')}
						</h2>
						{prefill === null ? (
							<div className='flex-1 flex items-center justify-center py-10 text-slate-500 text-sm'>
								...
							</div>
						) : (
							<Formik
								initialValues={prefill}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								<Form className='flex flex-col flex-1 gap-6'>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
										<CustomField
											label={t('firstName')}
											name='firstName'
											type='text'
											autoComplete='given-name'
										/>
										<CustomField
											label={t('lastName')}
											name='lastName'
											type='text'
											autoComplete='family-name'
										/>
									</div>
									<CustomField
										label={t('phone')}
										name='phone'
										type='tel'
										autoComplete='tel'
										inputMode='tel'
										placeholder='+380 __ ___ __ __'
									/>
									<CustomField
										label={t('email')}
										name='email'
										type='email'
										autoComplete='email'
										inputMode='email'
									/>

									{/* Єдина кнопка: валідація → збереження → підпис → авторедірект */}
									<button
										type='submit'
										disabled={loading || redirecting}
										className='mt-auto w-full rounded-xl bg-[#e2a550] hover:bg-[#d29440] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-lg py-4 duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#e2a550]/20'
									>
										<LockClosedIcon className='h-5 w-5' />
										{loading || redirecting
											? t('redirect')
											: `${t('button')} · ${orderPrice} ₴`}
									</button>

									<p className='text-center text-xs leading-relaxed text-slate-400'>
										Оплачуючи участь, ви погоджуєтесь з{' '}
										<a
											href='/publicofer'
											target='_blank'
											rel='noreferrer'
											className='text-[#e2a550] underline underline-offset-4 hover:text-[#d29440]'
										>
											Публічною офертою
										</a>
										. У разі неявки на зустріч у погоджений час кошти не
										повертаються, якщо доступ до зустрічі був наданий належним
										чином.
									</p>

									{/* Сигнали довіри */}
									<div className='flex justify-center text-xs text-slate-500 tracking-wide'>
										Visa · Mastercard · Google Pay · Apple Pay
									</div>
								</Form>
							</Formik>
						)}

						{payment && (
							<PaymentPage pay={payment.pay} client={payment.client} />
						)}
					</div>
				</div>

				<div className='flex justify-center w-full mt-6'>
					<button
						onClick={() => router.back()}
						className='text-sm text-slate-500 hover:text-slate-300 underline underline-offset-4'
					>
						{t('button1')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Payments
