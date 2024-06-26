'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from 'react-redux'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {  doc, setDoc } from 'firebase/firestore'
import { storage, db } from '../../../firebase/config'
import { Formik, Form } from 'formik'

import { toast } from 'react-toastify'
import { Avatar } from '@/store/features/counterSlice'

const ImagePopup = () => {
	const [file, setFile] = useState(null)
	const [loading, setLoading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(null)
	const [data, setData] = useState()
	const id = useSelector((state) => state.counter.id)
	const avatar = useSelector((state) => state.counter.avatar)
	const dispatch = useDispatch()

	

	
	const uploadFile = (file, userId) => {
		const fileName = userId
		const storageRef = ref(storage, `photo/${fileName}`)
		const uploadTask = uploadBytesResumable(storageRef, file)

		return new Promise((resolve, reject) => {
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setUploadProgress(progress)
				},
				(error) => reject(error),
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => resolve(downloadURL))
						.catch((error) => reject(error))
				}
			)
		})
	}

	// Function to handle adding/updating the user's photo
	const handleAdd = () => {
		if (!file || !id) return
		setLoading(true)

		uploadFile(file, id)
			.then((downloadURL) => {
				const userDocRef = doc(db, 'users', id)
				const userData = { img: downloadURL }
				return setDoc(userDocRef, userData, { merge: true })
			})
			.then(() => {
				toast.success('Success!')
				setTimeout(() => dispatch(Avatar(avatar)), 1000)
			})
			.catch((error) => {
				console.error(error)
				toast.error('Error adding user.')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	useEffect(() => {
		if (!data) {
			fetch(`/api/userInfo`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: id,
				}),
			})
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						throw new Error('Error')
					}
				})
				.then(({ data }) => {
					setData(data)
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [id, data])

	const initialValues = {
		myFile: '',
	}

	return (
		<div className=' z-[60]  flex justify-center lg:items-center max-w-lg relative'>
			<div className='border-2 border-slate-500 bg-[#12181d] p-14 h-96 rounded-lg relative mt-5'>
				{loading && (
					<div className=' absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-[#12181d]/95 z-50'>
						<div className='loader'></div>
					</div>
				)}

				<div>
					<button className='absolute top-2 right-2 lg:right-10 sm:right-2 '>
						<XMarkIcon
							className='h-6 w-6 stroke-slate-600 fill-none stroke-[1.4px]'
							onClick={() => dispatch(Avatar(avatar))}
						/>
					</button>
				</div>
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
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
											src={
												data?.img ||
												'https://res.cloudinary.com/dentkbzne/image/upload/v1702742137/notphoto_ziwbqm.jpg'
											}
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
									name='file'
									type='file'
									id='file'
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: 'none' }}
								/>
							</div>
						</div>

						<button
							disabled={uploadProgress !== null && uploadProgress < 100}
							type='submit'
							className='bg-blur border border-slate-500 hover:border-slate-300 rounded-sm px-3 outline-none  text-slate-400 h-12 w-full   hover:border-blue-200/80 z-10 font-bold'
						>
							Add/Change
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	)
}

export default ImagePopup
