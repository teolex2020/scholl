"use client"
import React from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/solid'


const Desctop = () => {
  return (
		<div>
			{' '}
			<table className='table-fixed w-full'>
				<thead className='text-sm'>
					<tr className='h-10 '>
						<th className='w-20 '>
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								№
							</div>
						</th>
						<th className='w-24 '>
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Фото
							</div>
						</th>
						<th className=''>
							{' '}
							<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
								Имя
							</div>
						</th>
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
						<td className=' text-center '>1.</td>
						<td className='  '>
							<div className='w-full flex justify-center'>
								<div className='w-10 h-10 bg-blur rounded-full '></div>
							</div>
						</td>
						<td className='text-sm text-center  '>
							<div className=''> Бортник Руслан</div>
							<div className='text-[10px]'> политолог</div>
						</td>
						<td className='w-96 '>
							Fundamentals of practical political analysis
						</td>
						<td className='w-32 text-center'>
							<button className='bg-green-700 text-sm rounded-sm px-2 py-1'>
								Оплаченно
							</button>
						</td>

						<td className=' '>
							<div className='w-full flex justify-center'>
								<VideoCameraIcon className='h-6 w-6 fill-green-700' />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Desctop