import React from 'react'

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
				<div className='bg-blur h-48 w-full rounded-xl'>
					<p className='w-full text-lg font-semibold  p-2'>Мои Курсы:</p>
					<div>1. Fundamentals of practical political analysis  </div>
				</div>
				<div className='bg-blur h-48 w-full rounded-xl'>
					{' '}
					<p className='w-full text-lg font-semibold  p-2'>Мои Встречи:</p>
				</div>
				<div className='bg-blur h-48 w-full rounded-xl'>
					{' '}
					<p className='w-full text-lg font-semibold  p-2'>
						Мои Мозговые Штурмы:
					</p>
				</div>
			</div>
		</div>
	)
}

export default List
