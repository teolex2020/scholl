'use client'
import React from 'react'
import Desctop from './Desctop'
import Mobiletable from './Mobiletable'

const List = () => {
	return (
		<div className='h-full flex lg:gap-10 items-center lg:items-start lg:justify-between flex-col lg:flex-row container mx-auto'>
			<div className='w-96 h-full lg:bg-blur flex flex-2 flex-col items-center py-5 gap-5 rounded-xl lg:m-10'>
				<p className='text-2xl'>Личная информация</p>
				<div className=''>
					<div className='w-24 h-24 lg:w-48 lg:h-48 rounded-full bg-blur'></div>
				</div>
				<div className='flex gap-3 text-xl'>
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
			<hr className='opacity-10 w-full py-3 lg:hidden' />
			<div className='flex flex-col gap-10 lg:p-10 flex-1 '>
				<div className='lg:bg-blur min-h-[500px] w-full rounded-xl lg:p-5'>
					<div className='lg:hidden'>
						<Mobiletable />
					</div>
					<div className='hidden lg:block'>
						<Desctop />
					</div>
				</div>
			</div>
		</div>
	)
}

export default List
