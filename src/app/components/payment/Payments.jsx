'use client'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import {
	CheckIcon,
	CreditCardIcon,
	BookmarkIcon,
} from '@heroicons/react/24/solid'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import order from '../../../../public/assets/order.webp'
import { useSelector } from 'react-redux'
import { useRouter } from '@/navigation'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { nanoid } from 'nanoid'
import Loader from '../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslations } from 'next-intl'
import PaymentPage from './PayForm'


const CustomField = ({ label, name, type }) => (
	<div className='relative group'>
		<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg px-2 text-[14px] group-hover:text-blue-200/80'>
			{label}
		</p>
		<Field
			name={name}
			type={type}
			className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none text-slate-200 h-12 w-full text-sm group-hover:border-blue-200/80'
		/>
		<ErrorMessage name={name}>
			{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
		</ErrorMessage>
	</div>
)

// Validation Schema
const validationSchema = Yup.object({
	firstName: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.min(2, 'Your First Name Needs To Be Valid')
		.required(),
	lastName: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.min(2, 'Your Last Name Needs To Be Valid')
		.required(),
	email: Yup.string().email('Invalid email').required(),
	phone: Yup.number().required(),
})

const Payments = () => {
	const [formdata, setFormdata] = useState(() => Date.now())
	const [isChecked, setIsChecked] = useState(false)
	
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState('')
	const [merch, setMerch] = useState(null)
	const { orderPrice, orderTitle, id, authUser, orderId } = useSelector(
		(state) => state.counter
	)
	const router = useRouter()
	const t = useTranslations('Order')
	const {current} = useRef(nanoid())
	
	console.log(data)

	const confirmForm = async () => {
		const response = await fetch('/api/createorder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				orderId: current + orderId,
				price: orderPrice,
				productName: orderTitle,
				data: formdata,
			}),
		})

		if (response.ok) {
			const data = await response.json()

			setMerch(data.signature)
		} else {
			console.error('Помилка при отриманні merchantSignature')
		}
	}

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
	}

	const handleAdd = async (values) => {
		setData(values)
		setLoading(true)

	
		if (!authUser) {
			router.push('/login')
		}

		const userDocRef = doc(db, 'order', current + orderId)
		const userData = {
			...values,
			orderNumber: current + orderId,
			orderPrice: orderPrice,
			orderTitle: orderTitle,
			timeStamp: serverTimestamp(),
			id: id,
		}

		try {
			await setDoc(userDocRef, userData, { merge: true })
			// toast.success('Success!')
			confirmForm()
		} catch (error) {
			toast.error('Error')
		} finally {
			setLoading(false)
		}
	}



		

	return (
		<div className='min-w-screen h-fit bg-transparent flex  justify-center px-5 mt-10 z-50'>
			{loading && <Loader />}

			<div
				className={clsx(
					'w-full mx-auto rounded-lg bg-transparent shadow1 p-5 text-gray-700 flex',
					'max-w-sm'
				)}
			>
				<div className='flex-1'>
					<div className='relative w-full h-48 rounded-xl border-4 border-zinc-800 '>
						<Image
							src={order}
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							alt='course'
							className=' object-cover rounded-lg'
							priority
						/>
					</div>
					<div className='w-full text-center pt-3 text-2xl text-slate-400 font-semibold'>
						{t('title')}{' '}
						<span className='text-white text-sm'>{current + orderId}</span>
					</div>
					<div className='flex gap-2 py-3 text-[#e2a550]  font-serif font-semibold'>
						<div>
							<CheckIcon className='h-6 w-6 text-green-500' />
						</div>
						{orderTitle}
					</div>
					<div className='text-white space-x-5  flex'>
						<div>
							<BookmarkIcon className='h-6 w-6 text-green-500' />
						</div>
						<span> {t('quantity')}</span> <span>1 шт.</span>
					</div>
					<div className='text-white space-x-5  flex mt-5'>
						<div>
							<CreditCardIcon className='h-6 w-6 text-green-500' />
						</div>
						<span>{t('price')}</span> <span>{orderPrice} ₴.</span>
					</div>
					<Formik
						enableReinitialize
						initialValues={{
							firstName:  '',
							lastName:  '',
							phone:  '',
							email: '',
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							handleAdd(values)
							setSubmitting(false)
						}}
					>
						<Form className='flex flex-col pt-10 mx-auto gap-6  justify-start relative'>
							<CustomField label='First Name*' name='firstName' type='text' placeholder='First Name'/>
							<CustomField label='Last Name*' name='lastName' type='text' placeholder='Last Name'/>
							<CustomField label='Phone*' name='phone' type='text' placeholder='Phone' />
							<CustomField label='Email*' name='email' type='email' placeholder='Email'/>

							<button
								type='submit'
								className='flex items-center w-full space-x-5 z-50 cursor-pointer'
								onClick={() => handleCheckboxChange()}
							>
								<div className='border-2 border-zinc-700'>
									<CheckIcon
										className={`h-6 w-6  ${
											merch ? 'text-green-500' : 'text-red-500'
										} `}
									/>
								</div>{' '}
								<div className=' text-lg  text-slate-400'>
									{merch ? t('corect') : t('notcorect')}
								</div>
							</button>
						</Form>
					</Formik>
					<div className='z-50 flex justify-center  relative '>
						{!merch && (
							<div className=' border-2 rounded-3xl border-[#e2a550] colorgold justify-center py-2 flex space-x-16 duration-300  z-50 text-lg lg:text-2xl px-10 max-w-[350px] mt-5'>
								{t('button')}
							</div>
						)}
						{merch && (
							<PaymentPage
								merch={merch}
								orderId={current + orderId}
								orderPrice={orderPrice}
								orderTitle={orderTitle}
								firstName={data.firstName}
								lastName={data.lastName}
								email={data.email}
								clientPhone={data.phone}
								data={formdata}
								titleButton={t('button')}
							/>
						)}
					</div>
					<div className='flex justify-center w-full'>
						<button
							onClick={() => router.back()}
							className='py-2 flex text-slate-400 z-10 text-center text-lg hover:text-slate-300'
						>
							{t('button1')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payments
