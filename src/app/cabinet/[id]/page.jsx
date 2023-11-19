import React from 'react'
import Menu from '@/app/components/cabinet/Menu'
import Image from 'next/image'
import List from '@/app/components/cabinet/List'
import Link from 'next/link'

 const page = () => {
  return (
		<div className=' fixed  bg-[#12181d] z-30 flex flex-col justify-between border-2 border-zinc-700 left-0 right-0 top-0 bottom-0'>
			<div className='w-full flex justify-end px-10'>
				<Link href='/'>
					{' '}
					<button
						className={`mt-10 border-2 rounded-3xl border-zinc-700/50  justify-center py-2 flex space-x-16 duration-300 hover:bg-blur  px-10`}
					>
						Выйти
					</button>
				</Link>
			</div>
			<div className='w-full  flex justify-center '>
				<Menu />
			</div>
			<div className='flex flex-1 h-full'>
				<List />
			</div>
			<div></div>
		</div>
	)
}

export default page