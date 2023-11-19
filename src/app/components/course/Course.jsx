
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/24/solid'

const Course = () => {
	  const [isOpen, setIsOpen] = useState(false)

		const toggleOpen = () => setIsOpen(!isOpen)
	return (
		<div className='container mx-auto my-4 p-4  rounded flex flex-col gap-1 '>
			<div className='mb-4 flex bg-blur'>
				<div className='text-4xl flex-1  flex items-center justify-center p-10 flex-col'>
					<h2 className='text-left font-semibold'>
						{' '}
						Основы практического политического анализа: как отличать правду от
						лжи, и принимать правильные решения
					</h2>
					<div className='skewed-section mt-10 '>
						{' '}
						<div className='bg-white  text-black  rounded-sm flex items-center justify-center'>
							{' '}
							<p className='text-sm text-left p-2 font-semibold  '>
								Курс по политическому анализу и прогнозированию поможет вам
								приобрести важнейшие знания и навыки в социальной жизни, которые
								вы сможете применить в работе над практическими и сложными
								проектами.
							</p>
						</div>
					</div>

					<div>
						<button className='mt-10 border-2 rounded-3xl border-[#f0fc4b] text-[#f0fc4b] hover:font-semibold justify-center py-2 flex space-x-16   duration-300 hover:bg-blur z-10 text-2xl px-10'>
							Купить курс сейчас
						</button>
					</div>
				</div>
				<div className='flex-2'>
					<div className='w-full  flex justify-center relative mt-10'>
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
			<div className='border p-2 border-zinc-500/50 my-3 rounded-sm bg-blur'>
				<div className='space-y-3'>
					<p className='text-lg font-semibold'>Что вы узнаете, окончив курс:</p>
					<div className='flex gap-5'>
						<CheckIcon className='h-6 w-6 text-green-500' />
						<p>
							Критически оценивать информацию, аргументы и политику. Развитие
							навыков критического мышления имеет центральное значение в
							политическом анализе.
						</p>
					</div>
					<div className='flex gap-5'>
						<CheckIcon className='h-6 w-6 text-green-500' />
						<p>
							Лучше понимать и анализировать государственную политику, оценивать
							ее влияние на общество.{' '}
						</p>
					</div>
					<div className='flex gap-5'>
						<CheckIcon className='h-6 w-6 text-green-500' />
						<p>Моделировать сложные политические процессы.</p>
					</div>
					<div className='flex gap-5'>
						<CheckIcon className='h-6 w-6 text-green-500' />
						<p>
							Анализировать конкретные исторические и современные политические
							события, тематические исследования и сценарии реального мира.
						</p>
					</div>
				</div>
			</div>
			<div>
				<div
					className='flex flex-col items-start gap-3 w-full mx-auto mt-10 '
					onClick={toggleOpen}
				>
					<div>
						{' '}
						<p className='text-xl'>Программа курса: </p>
					</div>
					<p className='cursor-pointer'>
						1. Вступление. Касается всех. Уроки Миранды. (1 час)
					</p>
					<p className='cursor-pointer'>
						2. Деконструкция информационного потока (16 часов):
					</p>
					<div
						className={`transition-max-height duration-700 ease-in-out ${
							isOpen ? 'max-h-96' : 'max-h-0'
						} overflow-hidden `}
					>
						<ul className='text-left'>
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
					</div>
					<p className='cursor-pointer'>
						3. Реконструкция информации. Функциональный дизайн информационных
						потоков (конструирование и моделирование информационных потоков (9
						часов):
					</p>
					<div
						className={`transition-max-height duration-700 ease-in-out ${
							isOpen ? 'max-h-96' : 'max-h-0'
						} overflow-hidden `}
					>
						<ul className='text-left'>
							<li>- логический синтез (1 час);</li>
							<li>- элементы теория игр (1 час);</li>
							<li>- политическое моделирование и проектирование (1 час);</li>
							<li>- политическое прогнозирование (1 час); </li>
							<li>- визуализация (1 час); </li>
							<li>- тестирование и интерпретация (1 час);</li>
							<li>- текстология (1 час);</li>
							<li>- практические кейсы (2 часа). </li>
						</ul>
					</div>
					<p className='cursor-pointer'>
						4. Выводы. На пути к осознанно обязывающей свободе (2 часа).
					</p>
				</div>
			</div>
		</div>
	)
}

export default Course
