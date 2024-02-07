"use client"
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Payment = () => {

  return (
		<div className='min-w-screen h-fit bg-transparent flex  justify-center px-5 mt-10 '>
			<div
				className={clsx(
					'w-full mx-auto rounded-lg bg-transparent shadow1 p-5 text-gray-700 flex',
					'max-w-sm'
				)}
			>
				<div className='flex-1'>
					<h2 className='w-full text-center py-5 text-4xl text-slate-400 font-semibold'>
						Payment
					</h2>
					<div className='relative w-full flex justify-center'>
						<Image
							src='https://res.cloudinary.com/dentkbzne/image/upload/v1702837336/VISA_mxt6gm.jpg'
							width={100}
							height={100}
							alt='nonimage'
							className=' object-cover cursor-pointer '
							priority
						/>
					</div>
					<div className='flex items-end gap-3 w-full justify-center py-10 text-[#e2a550]'>
						<p>Price</p>
						<p className='text-4xl  font-semibold'>
							1500 <span>грн</span>
						</p>
					</div>
					<div>
						<Formik
							enableReinitialize={true}
							initialValues={{
								email: '',
								cardnumber: `${''}`,
								nameoncard: `${''}`,
								expiryMonth: `${''}`,
								cvc: `${''}`,
							}}
							validationSchema={Yup.object({
								email: Yup.string()
									.max(30, 'Must be 30 characters or less')
									.email('Invalid email address')
									.required('Please enter your email'),
								cardnumber: Yup.string()
									.required('Required')
									.matches(/^[0-9]+$/, 'Must be only digits')
									.max(16, 'Card no must be greater than or equal to 16 digits')
									.min(16, 'Card no must be contain 16 digits'),
								nameoncard: Yup.string()
									.max(30, 'Must be 20 characters or less')
									.min(2, 'Your Last Name Needs To Be Valid')
									.required(),
								cvc: Yup.string()
									.required('Required')
									.matches(/^[0-9]+$/, 'Must be only digits')
									.max(3, 'CVV no must be  equal to 3 digits')
									.min(3, 'CVV no must be contain 3 digits'),
								expiryMonth: Yup.string()
									.typeError('Not a valid expiration date. Example: MM/YY')
									.max(5, 'Not a valid expiration date. Example: MM/YY')
									.matches(
										/([0-9]{2})\/([0-9]{2})/,
										'Not a valid expiration date. Example: MM/YY'
									)
									.required('Required'),
							})}
							onSubmit={(values, { setSubmitting }) => {
								handleAdd(values)
								setSubmitting(false)
							}}
						>
							<Form className='flex flex-col  mx-auto gap-6  justify-start relative'>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										Full name
									</p>
									<Field
										placeholder='Alex Alex'
										name='nameoncard'
										type='text'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='nameoncard'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										Email
									</p>
									<Field
										placeholder='gmail@gmail.com'
										name='email'
										type='email'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='email'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										Card number
									</p>
									<Field
										placeholder='1234 5678 1234 5678'
										name='cardnumber'
										type='text'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='cardnumber'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>

								<div className='flex gap-3'>
									<div className='relative group '>
										<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
											Expiry date
										</p>
										<Field
											placeholder='12/13'
											name='expiryMonth'
											type='text'
											className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
										/>
										<ErrorMessage name='expiryMonth'>
											{(msg) => (
												<div className='text-red-500 text-sm'>{msg}</div>
											)}
										</ErrorMessage>
									</div>
									<div className='relative group '>
										<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
											Security code
										</p>
										<Field
											placeholder='123'
											name='cvc'
											type='password'
											className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full group-hover:border-blue-200/80 decoration-transparent '
										/>
										<ErrorMessage name='cvc'>
											{(msg) => (
												<div className='text-red-500 text-sm'>{msg}</div>
											)}
										</ErrorMessage>
									</div>
								</div>

								<button
									type='submit'
									className='bg-blur border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full   hover:border-blue-200/80 z-10 font-bold'
								>
									Pay
								</button>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment