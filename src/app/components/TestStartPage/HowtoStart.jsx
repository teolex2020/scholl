'use client'
import Link from 'next/link'

const steps = [
	{
		id: 1,
		title: 'Вибір курсу/лекці/зустрічі',
		description: (
			<>
				Оберіть курс із{' '}
				<Link href='/courses'>
					<p className='text-[#e2a550] font-medium'>переліку курсів</p>
				</Link>
				.
			</>
		),
	},
	{
		id: 2,
		title: 'Заповнення форми',
		description: 'Заповніть коротку форму для оформлення замовлення.',
	},
	{
		id: 3,
		title: 'Оплата',
		description: 'Здійсніть оплату зручним для вас способом.',
	},
	{
		id: 4,
		title: 'Підтвердження',
		description: 'Отримайте підтвердження замовлення та доступ до курсу.',
	},

]

const HowToStart = () => {
	return (
		<section className='max-w-[1400px] mx-auto mt-16 rounded-xl py-12'>
			<div className='px-6 sm:px-10 text-center text-gray-200'>
				<h2 className='text-2xl sm:text-3xl font-bold colorgold mb-4'>
					Як почати навчання
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  place-items-center'>
					{steps.map((step) => (
						<div
							key={step.id}
							className=' rounded-lg p-6 text-center bg-blur w-full max-w-[280px] h-52'
						>
							<div className='flex items-center justify-center w-12 h-12 mx-auto bg-[#e2a550] rounded-full mb-4'>
								<span className='text-white font-bold'>{step.id}</span>
							</div>
							<h3 className='font-semibold text-lg colorgold mb-2'>
								{step.title}
							</h3>
							<p className='text-sm text-gray-700'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default HowToStart
