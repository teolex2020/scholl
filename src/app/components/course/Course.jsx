
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckIcon, ChevronDoubleDownIcon, FireIcon, AcademicCapIcon } from '@heroicons/react/24/solid'
import ImageCarousel from './Carousel'
import Cart from './Cart'

const listStart = [
	{
		title: `Критически оценивать информацию, аргументы и политику. Развитие
							навыков критического мышления имеет центральное значение в
							политическом анализе.`,
	},
	{
		title: `Лучше понимать и анализировать государственную политику, оценивать
							ее влияние на общество.`,
	},
	{
		title: `Моделировать сложные политические процессы.`,
	},
	{
		title: `Анализировать конкретные исторические и современные политические
							события, тематические исследования и сценарии реального мира.`,
	},
]

const ListItem = ({ title }) => (
	<div className='flex gap-5 items-center'>
		<div>
			{' '}
			<CheckIcon className='h-6 w-6 text-green-500' />
		</div>

		<div className='text-start '>{title}</div>
	</div>
)


const Accordion = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className=' flex gap-5 items-start flex-col text-left'>
			<div className='cursor-pointer flex gap-3' onClick={toggleOpen}>
				<div>
					<ChevronDoubleDownIcon
						className={`h-6 w-6 text-green-500 duration-700 ease-in-out ${
							isOpen ? 'rotate-180 du' : 'rotate-0 '
						}`}
					/>
				</div>

				{title}
			</div>
			<div
				className={`transition-all duration-700 ease-in-out
 ${isOpen ? 'max-h-96 ' : 'max-h-0 '} overflow-hidden`}
			>
				{isOpen && children}
			</div>
		</div>
	)
}


const Course = () => {
	  const [isOpen, setIsOpen] = useState(false)

		const toggleOpen = () => setIsOpen(!isOpen)
	return (
		<div className='container mx-auto my-4 p-4  rounded flex flex-col gap-1 '>
			<div className='mb-4 flex bg-blur flex-col-reverse lg:flex-row'>
				<div className='text-xl lg:text-4xl flex-1  flex items-center justify-center p-10 flex-col'>
					<h2 className='text-left font-semibold'>
						{' '}
						Основы практического политического анализа: как отличать правду от
						лжи, и принимать правильные решения
					</h2>
					<div className='skewed-section mt-10 '>
						<div className='bg-white  text-black  rounded-sm flex items-center justify-center'>
							<p className='text-sm text-left p-2 font-semibold  '>
								Курс по политическому анализу и прогнозированию поможет вам
								приобрести важнейшие знания и навыки в социальной жизни, которые
								вы сможете применить в работе над практическими и сложными
								проектами.
							</p>
						</div>
					</div>
					<div className='text-sm pt-5 w-full text-start flex items-center gap-3'>
						{' '}
						<div>
							{' '}
							<AcademicCapIcon className='h-6 w-6 text-green-500' />
						</div>
						Преподаватель:{' '}
						<span className='uppercase underline cursor-pointer '>
							Бортник Руслан
						</span>{' '}
					</div>
					<div>
						<button className='mt-10 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-lg lg:text-2xl px-10'>
							Купить курс сейчас
						</button>
					</div>
				</div>
				<div className='flex-2'>
					<div className='w-full  flex justify-center relative mt-10 w-'>
						<div className='absolute  bg-blue-400 w-96 h-full blur-3xl rounded-full opacity-[20%]'></div>

						<Image
							src='/course.png'
							width={500}
							height={500}
							alt=''
							className='rounded-full'
						/>
					</div>
				</div>
			</div>
			<div className='border p-2 lg:text-xl border-zinc-500/50 my-3 rounded-sm bg-blur'>
				<div className='space-y-3'>
					<p className='text-2xl font-semibold'>
						Что вы узнаете, окончив курс:
					</p>
					{listStart.map((item, index) => (
						<ListItem key={index} title={item.title} />
					))}
				</div>
			</div>
			<div className='flex flex-col lg:flex-row'>
				<div
					className='flex flex-col lg:text-xl  gap-3 w-full mx-auto mt-10 text-start flex-1 '
					onClick={toggleOpen}
				>
					<div>
						<p className='text-2xl mb-7'>Программа курса: </p>
					</div>
					<Accordion title=' Вступление. Касается всех. Уроки Миранды. (1 час)'></Accordion>
					<Accordion title=' Деконструкция информационного потока (16 часов):'>
						<ul className='text-left flex flex-col gap-3'>
							<li>
								- принципы и цели политического анализа, очевидно-непонятные
								вещи, уголовная доктрина доктора Хауса (2 часа);
							</li>
							<li>
								- субъекты и объекты (сложности определения настоящего объекта
								анализа) - (1 час);{' '}
							</li>
							<li>
								- технологии обработки информации (визуализация, проблемы
								восприятия, верификация, классификация, структурирование),
								опорные точки информационного потока (2 часа);{' '}
							</li>
							<li>- логический анализ и матричный способ (1 час); </li>
							<li>- ситуационный анализ, индукция и дедукция (1 час); </li>
							<li>
								- мысленный эксперимент и политическое моделирование (2 часа);{' '}
							</li>
							<li>- компаративистский (сравнительный) анализа (1 час); </li>
							<li>- экспертные опросы и рейтингование (1 час); </li>
							<li>- ИИ аудит (1 час); </li>
							<li>- практические кейсы (2 часа). </li>
						</ul>
					</Accordion>
					<Accordion
						title=' Реконструкция информации. Функциональный дизайн информационных
						потоков (конструирование и моделирование информационных потоков) (9
						часов):'
					>
						<ul className='text-left flex flex-col gap-3'>
							<li>- логический синтез (1 час);</li>
							<li>- элементы теория игр (1 час);</li>
							<li>- политическое моделирование и проектирование (1 час);</li>
							<li>- политическое прогнозирование (1 час); </li>
							<li>- визуализация (1 час); </li>
							<li>- тестирование и интерпретация (1 час);</li>
							<li>- текстология (1 час);</li>
							<li>- практические кейсы (2 часа). </li>
						</ul>
					</Accordion>
					<Accordion title=' Выводы. На пути к осознанно обязывающей свободе (2 часа).'></Accordion>
				</div>
				<Cart />
			</div>
			<hr className='opacity-10 my-5' />
			<div className='flex flex-col items-center gap-6'>
				<div className='text-2xl'>
					После прохождения курса вы получите сертификат
				</div>
				<div>
					<Image
						src='/certificat.png'
						width={300}
						height={300}
						alt='certificat'
					/>
				</div>
			</div>
			{/* <ImageCarousel /> */}
			<hr className='opacity-10 my-5' />
			<div className='mb-14 lg:text-xl flex flex-col '>
				<div>
					<div className='text-2xl mb-5'>Частые вопросы:</div>
				</div>
				<Accordion title=' Как можно попасть на онлайн-занятие?'>
					<ul className='text-left flex flex-col gap-3 py-5'>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>
							Выберите на сайте необходимое занятие и нажмите на кнопку
							«Записаться»;
						</li>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>{' '}
							Проверьте почту включая Спам. В почте вы найдёте подтверждение
							записи и ссылку на оплату;
						</li>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>{' '}
							Оплатите занятие банковской картой, либо при помощи систем Apple
							Pay и Google Pay;
						</li>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>
							После оплаты в вашем «Личном кабинете» появится ссылка на
							Zoom-трансляцию.{' '}
						</li>
					</ul>
				</Accordion>
				<Accordion title=' Могу ли я приобрести  занятие видеокурса, если оно уже прошло?'>
					<ul className='text-left flex flex-col gap-3 py-5'>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>
							Да. Вы можете оплачивать занятия по отдельности, когда вам это
							удобно.
						</li>
						<li className='flex gap-3'>
							<span>
								<FireIcon className='h-5 w-5 text-red-500' />
							</span>{' '}
							Для этого, на странице оплаты, просто выберете нужное занятия для
							оплаты(добавить видеоинструкцию)
						</li>
					</ul>
				</Accordion>
			</div>
			<hr className='opacity-10 my-5' />
		</div>
	)
}

export default Course
