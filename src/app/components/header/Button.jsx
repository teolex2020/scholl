import React from 'react'
import Link from 'next/link'


const Button = ({font}) => {
  return (
		<div>
			{' '}
			{true ? (
				<Link href={!true ? '/login' : '/cabinet/1'}>
					<button
						className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16 ${font} uppercase duration-300`}
					>
						<p className='duration-300  text-lg'>Мой кабинет</p>
					</button>
				</Link>
			) : (
				<Link href='/login'>
					<button
						className={`border-2 rounded-3xl border-zinc-700/50 px-10 py-2 flex  hover:bg-blur space-x-16 ${font} uppercase duration-300`}
					>
						<p className='duration-300  text-lg'>Выйти</p>
					</button>
				</Link>
			)}
		</div>
	)
}

export default Button