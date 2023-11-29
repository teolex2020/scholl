'use client'
import React from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/solid'

const List = () => {
	return (
		<div className='h-full flex gap-10 justify-between'>
			<div className='w-96 h-full bg-blur flex flex-2 flex-col items-center py-5 gap-5 rounded-xl m-10'>
				<p>Личная информация</p>
				<div className=''>
					<div className='w-48 h-48 rounded-full bg-blur'></div>
				</div>
				<div className='flex gap-5'>
					<p>Ivan</p>
					<p>Ivanov</p>
				</div>
				<div>
					<button
						className={` border-2 rounded-3xl border-zinc-700/50  justify-center py-3 flex space-x-16 duration-300 hover:bg-blur  px-10 my-5`}
					>
						Редактировать данные
					</button>{' '}
				</div>
			</div>
			<div className='flex flex-col gap-10 p-10 flex-1'>
				<div className='bg-blur min-h-[500px] w-full rounded-xl p-5'>
					<table className='table-fixed '>
						<thead className='text-sm'>
							<tr className='h-10 '>
								<th className='w-24 '>
									<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
										№
									</div>
								</th>
								<th className='w-24 '>
									<div className='border-2 mx-2 rounded-3xl border-zinc-700/50'>
										Фото
									</div>
								</th>
								<th>
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
								<td className='w-24  text-center'>1.</td>
								<td className='w-24 pl-6'>
									<div className='w-10 h-10 bg-blur rounded-full'></div>
								</td>
								<td className='text-sm text-center w-32'>
									<div className=''> Бортник Руслан</div>
									<div className='text-[10px]'> политолог</div>
								</td>
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
			</div>
		</div>
	)
}

export default List
