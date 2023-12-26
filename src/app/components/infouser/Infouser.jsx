'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'

import { storage, db, auth } from '@/firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter} from 'next/navigation'
// import notphoto from "../../../../public/assets/notfound.png"
const Infouser = () => {
	const id = useSelector((state) => state.counter.id)
		const [data, setData] = useState()
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				if (user?.emailVerified !== true) {
					router.push('/login')

					// Диспатч Redux Action тут
				} else {
					console.log('User is logged in')
				}
			})

			return () => unsubscribe()
		}, 600)
	})

	const [file, setFile] = useState('')
	

	const [uploadProgress, setUploadProgress] = useState(null)

	const handleAdd = async (values) => {
		const userDocRef = doc(db, 'users', id)
		try {
			if (file) {
				const uploadFile = () => {
					const fileName = id
					const storageRef = ref(storage, photo/fileName)
					const uploadTask = uploadBytesResumable(storageRef, file)

					uploadTask.on('state_changed', (snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						setUploadProgress(progress)

						if (progress === 100) {
							getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
									const userData = {
										firstName: values.firstName,
										lastName: values.lastName,
										phone: values.phone,
										email: values.email,
										timeStamp: serverTimestamp(),
										id: id,
										img: downloadURL,
										// img: fileName,
									}

									const docSnap = await getDoc(userDocRef)

									if (docSnap.exists()) {
										await setDoc(userDocRef, userData)
									} else {
										await setDoc(userDocRef, userData)
									}
									toast.success('Success !')
									setTimeout(() => {
										router.back()
									}, 2000)
							}, )
						}
					})
				}

				if (file) {
					uploadFile()
				}
			}

		
		} catch (error) {
			toast.error('Error add user.')
		}
	}

useEffect(() => {
	if (id?.length !== 0) {
		const fetchUserData = async () => {
			const userDocRef = doc(db, 'users', id)

			try {
				const docSnap = await getDoc(userDocRef)

				if (docSnap.exists()) {
					setData(docSnap.data())
				} else {
					console.log('No such user!')
				}
			} catch (error) {
				console.error('Error fetching user: ', error)
			}
		}

		fetchUserData()
	}
}, [id])



	return (
		<div
			className={`fixed top-0 right-0 left-0 bottom-0 z-50 pointer-events-auto bg-[#12181d]  `}
		>
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
				<div className=' z-30 relative max-w-md lg:w-1/3 md:w-2/4 w-96 p-10 rounded-lg  h-fit sm:mt-10 shadow1'>
					<button
						className='absolute top-2 right-2 '
						onClick={() => router.back()}
					>
						<XMarkIcon className='h-6 w-6 stroke-slate-600 fill-none stroke-[1.4px]' />
					</button>

					<div className=''>
						<Formik
							enableReinitialize={true}
							initialValues={{
								firstName: `${data?.lastName ?? ''}`,
								lastName: `${data?.firstName ?? ''}`,
								phone: `${data?.phone ?? ''}`,
								email: `${data?.email ?? ''}`,
							}}
							validationSchema={Yup.object({
								firstName: Yup.string()
									.max(15, 'Must be 15 characters or less')
									.min(2, 'Your First Name Needs To Be Valid'),
								lastName: Yup.string()
									.max(20, 'Must be 20 characters or less')
									.min(2, 'Your Last Name Needs To Be Valid'),

								email: Yup.string().email('Invalid email'),
								phone: Yup.number(),
							})}
							onSubmit={(values, { setSubmitting }) => {
								handleAdd(values)
								setSubmitting(false)
							}}
						>
							<Form className='flex flex-col  mx-auto gap-6  justify-start relative'>
								<div className='w-full flex justify-center pb-5'>
									<div className='  relative '>
										<label htmlFor='file' className=''>
											{!file ? (
												<Image
													src={data?.img || 'https://res.cloudinary.com/dentkbzne/image/upload/v1702742137/notphoto_ziwbqm.jpg'}
													width={100}
													height={100}
													alt='nonimage'
													className='rounded-full object-cover cursor-pointer '
													priority
													style={{ height: '180px', width: '180px' }}
												/>
											) : (
												<Image
													src={
														file
															? URL.createObjectURL(file)
															: 'https://res.cloudinary.com/dentkbzne/image/upload/v1702742137/notphoto_ziwbqm.jpg'
													}
													width={100}
													height={100}
													alt='nonimage'
													className='rounded-full object-cover cursor-pointer '
													priority
													style={{ height: '180px', width: '180px' }}
												/>
											)}
										</label>
										<input
											type='file'
											id='file'
											onChange={(e) => setFile(e.target.files[0])}
											style={{ display: 'none' }}
										/>
									</div>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										{true ? 'First Name' : 'Електронна пошта'}
									</p>
									<Field
										name='firstName'
										type='text'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='firstName'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										{true ? 'Last Name' : 'Електронна пошта'}
									</p>
									<Field
										name='lastName'
										type='text'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='lastName'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										{true ? 'Phone' : 'Електронна пошта'}
									</p>
									<Field
										name='phone'
										type='text'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='phone'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>
								<div className='relative group '>
									<p className='absolute -top-3 left-4 text-slate-400 bg-[#11171c] rounded-lg  px-2 flex justify-center text-[14px] group-hover:text-blue-200/80'>
										{true ? 'Email' : 'Електронна пошта'}
									</p>
									<Field
										name='email'
										type='email'
										className='bg-inherit border border-slate-500 rounded-sm px-3 outline-none  text-slate-200 h-12 w-full text-sm  group-hover:border-blue-200/80 decoration-transparent '
									/>
									<ErrorMessage name='email'>
										{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
									</ErrorMessage>
								</div>

								<button
									disabled={uploadProgress !== null && uploadProgress < 100}
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
