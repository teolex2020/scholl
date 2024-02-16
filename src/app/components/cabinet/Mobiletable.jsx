'use client'
import { useEffect, useState } from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
const Mobiletable = () => {
	const t = useTranslations('Cabinetdata')
	const [orderdata, setOrderData] = useState()
	const id = useSelector((state) => state.counter.id)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`http://localhost:3000/en/api/userData`, {
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

				setOrderData(data)
			} else {
				console.error('Помилка при data')
			}
		}

		fetchData()
	}, [id])

	return (
		<div>
			{' '}
			<table className='table-fixed w-full '>
				<thead className='text-sm  border-b  border-zinc-700/50'>
					<tr className=' text-lg '>
						<th className='flex '>
							{' '}
							<div className=' w-48 p-2 '>{t('theme')}</div>
						</th>
						<th className=' w-32 '>
							{' '}
							<div className=' p-2 w-32 '>{t('paid')}</div>
						</th>
					</tr>
				</thead>
				{orderdata ? (
					orderdata?.map((item, i) => (
						<tbody key={i} className=''>
							<tr className=' h-10'>
								<td className=' text-sm'>
									{i + 1}.&nbsp;&nbsp;{item.title}.
								</td>
								<td className='w-32 text-center'>
									{item?.reason == 'Ok' ? (
										<div
											className={`bg-green-700 text-sm rounded-sm px-2 py-1`}
										>
											Paid
										</div>
									) : (
										<div className={`bg-red-700 text-sm rounded-sm px-2 py-1`}>
											Not paid
										</div>
									)}
								</td>
							</tr>
						</tbody>
					))
				) : (
					<tbody className=''>
						<tr className=' h-20'>
							<td className=' text-sm'></td>
							<td className='w-32 text-center'>
								<div className='bg-green-700 text-sm rounded-sm px-2 py-1'></div>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default Mobiletable
