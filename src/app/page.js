import Image from 'next/image'
// import MovingCircle from './components/mouse/Mouse.jsx'
import { Gentium_Book_Plus } from 'next/font/google'
import Link from 'next/link'

const gentium = Gentium_Book_Plus({
	weight: '400',
	subsets: ['latin'],
})

export default function Home() {
	return (
		<div className='container mx-auto elem bg-blur py-5 lg:pb-24 mt-0 lg:mt-24 relative '>
			<div className='flex justify-between flex-col lg:flex-row items-center lg:gap-48 '>
				<div className=' flex lg:flex-1 h-48 lg:h-[450px] w-96  relative justify-center '>
					<div className='absolute ml-28  bg-blue-300 w-96 h-full blur-3xl rounded-full opacity-[15%]'></div>
					<div className='absolute bg-blue-200 w-48 h-48 ml-32 blur-3xl rounded-full opacity-[25%]'></div>
					<Image
						src='/bg.png'
						alt='logo '
						fill
						sizes='(min-width: 808px) 50vw, 100vw'
						style={{
							objectFit: 'cover', // cover, contain, none
						}}
					/>
				</div>
				<div className='flex flex-1 h-full  flex-col px-5 text-center lg:text-left  gap-5'>
					<div className={` ${gentium.className} py-6   `}>
						<p className='text-2xl'>Школа политического анализа</p>{' '}
						<p className='colorgold text-5xl '> Руслана Бортника</p>
					</div>
					25-летний опыт информационно-политического анализа и компаний,
					уникальная авторская методология, крутые примеры и глобальные клиенты,
					успех и известность во враждебной среде! С нами Вы обретете настоящую
					Свободу в обществе и откроете дорогу к личному Успеху - научитесь
					нестандартно мыслить и действовать в угоду своим интересам, понимать
					суть происходящих политически, социальных и економических процессов,
					принимать правильные жизненные решения!
					<Link href='/course'>
						<button className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-2xl px-10 w-full'>
							<p className=' text-xl uppercase'>Наши курсы</p>
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
