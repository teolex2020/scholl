"use client"
import React from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'

const Mobiletable = () => {
		const t = useTranslations('Cabinetdata')
  return (
		<div>
			{' '}
			<table className='table-fixed '>
				<thead className='text-sm'>
					<tr className='h-10 '>
						<th>
							{' '}
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								{t('theme')}
							</div>
						</th>
						<th>
							{' '}
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								{t('paid')}
							</div>
						</th>

						{/* <th className='w-24 '>
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Видео
							</div>
						</th> */}
					</tr>
				</thead>
				<tbody className=''>
					<tr className=' h-20'>
						<td className='w-72'>
							<div className='w-full flex justify-center pl-5'>
								<div>Fundamentals of practical political analysis</div>
							</div>
						</td>
						<td className='w-32 text-center'>
							<button className='bg-green-700 text-sm rounded-sm px-2 py-1'>
								Оплаченно
							</button>
						</td>

						{/* <td className=' pl-8 '>
							<VideoCameraIcon className='h-6 w-6 fill-green-700' />
						</td> */}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Mobiletable