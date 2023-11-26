import React from 'react'

import Image from 'next/image'
import List from '@/app/components/cabinet/List'
import Link from 'next/link'

 const page = () => {
  return (
		<div className='   z-30 flex flex-col justify-between  relative h-full'>
			{/* <div className='w-full flex justify-end px-10 absolute top-2'>
				<Link href='/'>
					{' '}
					<button
						className={` border-2 rounded-3xl border-zinc-700/50  justify-center py-2 flex space-x-16 duration-300 hover:bg-blur  px-10`}
					>
						Выйти
					</button>
				</Link>
			</div> */}
						<div className=' h-full'>
				<List />
			</div>
			<div></div>
		</div>
	)
}

export default page