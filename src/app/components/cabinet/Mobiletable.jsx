"use client"
import React from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/solid'


const Mobiletable = () => {
  return (
		<div>
			{' '}
			<table className='table-fixed '>
				<thead className='text-sm'>
					<tr className='h-10 '>
						
						<th>
							{' '}
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Тема лекции
							</div>
						</th>
						<th>
							{' '}
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Статус
							</div>
						</th>

						<th className='w-24 '>
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Видео
							</div>
						</th>
					</tr>
				</thead>
				<tbody className=''>
					<tr className=' h-20'>
					
						<td className='w-96 text-center'>
							Fundamentals of practical political analysis
						</td>
						<td className='w-32 text-center'>
							<button className='bg-green-700 text-sm rounded-sm px-2 py-1'>
								Оплаченно
							</button>
						</td>

						<td className=' pl-8 '>
							<VideoCameraIcon className='h-6 w-6 fill-green-700' />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Mobiletable