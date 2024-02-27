'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import Loader from '../Loader/Loader'

// Custom Input Field Component
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
		<ErrorMessage
			name={name}
			component='div'
			className='text-red-500 text-sm'
		/>
	</div>
)

// Validation Schema
const validationSchema = Yup.object({
	firstName: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.min(2, 'Your First Name Needs To Be Valid'),
	lastName: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.min(2, 'Your Last Name Needs To Be Valid'),
	email: Yup.string().email('Invalid email'),
	phone: Yup.number(),
})

const Infouser = () => {
	const { id, authUser } = useSelector((state) => state.counter)
	const [data, setData] = useState()
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		authUser !== true && router.push('/login')
	})

	useEffect(() => {
		if (!data) {
			async function fetchData() {
				const response = await fetch(`/api/userInfo`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: id,
					}),
				})

				if (response.ok) {
					const { data } = await response.json()

					setData(data)
				} else {
					console.error('Error')
				}
			}

			fetchData()
		}
	}, [id, data])

	const handleAdd = async (values) => {
		if (!id) return
		setLoading(true)

		try {
			const response = await fetch('/api/addUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...values, id }),
			})

			if (response.ok) {
				toast.success('Success!')
				setTimeout(() => router.back(), 1000)
			} else {
				throw new Error('Failed to add user.')
			}
		} catch (error) {
			toast.error('Error adding user.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={`fixed top-0 right-0 left-0 bottom-0 z-50 pointer-events-auto bg-[#12181d]  `}
		>
			{loading && <Loader />}

			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<div className=' w-full h-full flex justify-center items-center pointer-events-auto overflow-scroll'>
				{' '}
				<div className=' z-30 relative max-w-md lg:w-1/3 md:w-2/4 w-96 p-10 rounded-lg  h-fit sm:mt-10 border border-slate-500'>
					<button
						className='absolute top-2 right-10 sm:right-2 '
						onClick={() => router.back()}
					>
						<XMarkIcon className='h-6 w-6 stroke-slate-600 fill-none stroke-[1.4px]' />
					</button>

					<div className=''>
						<Formik
							enableReinitialize
							initialValues={{
								firstName: data?.firstName || '',
								lastName: data?.lastName || '',
								phone: data?.phone || '',
								email: data?.email || '',
							}}
							validationSchema={validationSchema}
							onSubmit={(values, { setSubmitting }) => {
								handleAdd(values)
								setSubmitting(false)
							}}
						>
							<Form className='flex flex-col  mx-auto gap-6  justify-start relative'>
								<CustomField label='First Name' name='firstName' type='text' />
								<CustomField label='Last Name' name='lastName' type='text' />
								<CustomField label='Phone' name='phone' type='text' />
								<CustomField label='Email' name='email' type='email' />

								<button
									type='submit'
									className='bg-blur border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full   hover:border-blue-200/80 z-10 font-bold'
								>
									SAVE
								</button>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Infouser
