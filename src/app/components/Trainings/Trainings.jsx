"use client"
import React from 'react'
import Image from 'next/image'
import text from "../../../../public/assets/kill.png"
import prompt from '../../../../public/assets/prompt.png'
import { ClockIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const train = [
	{
		image: '/assets/kill.png',
		title: ' Как писать «убойные тексты»?',
		descriptions: `Как писать тексты, воздействующие на общественное сознание? 
						Простые и эффективные структуры текстов, используемые западными СМИ.
						“USA-stile” и “British-stile”. Технология «Ключевых предложений»,
						аргументов/проблем/решений, резюмирующих предложений.  Как
						изложить любую позицию на 1 странницу? Как интегрировать своем
						мнение в сознание аудитории за 3 минуты.  Обо всем этом
						поговорим и попрактикуемся на конкретных Ваших и наших примерах.
					
						Всему научим и все покажем! Минимум теории - только практика!`,
		price: '29',
		currency: '$',
		time: '90',
		teacher: 'Бортник Руслан',
	},
	{
		image: '/assets/prompt.png',
		title: ' Prompt Engeneering або формуй запити правильно',
		descriptions: `Prompt Engineering є критичним навиком у роботі з моделями генеративного штучного інтелекту, такими як GPT-3 та GPT-4. Це мистецтво формування запитів або "промптів", що керують моделлю до бажаного результату. Ефективний Prompt Engineering вимагає розуміння того, як модель інтерпретує вхідні дані та які мовні структури вона використовує для генерації відповідей. Це може включати техніки, як-от вказівка контексту, вибір правильного тону та стилю, а також структурування запиту таким чином, щоб спрямувати модель до конкретних типів відповідей або форматів. Мета Prompt Engineering полягає у створенні таких запитів, які мінімізують неправильне тлумачення та максимізують корисність та точність результатів.`,
		price: '25',
		currency: '$',
		time: '90',
		teacher: 'Теплюк Александр',
	},
]



const Trainings = () => {
	return (
		<div className='h-full flex flex-col  items-center lg:items-start lg:justify-between container mx-auto relative mt-10 p-4 gap-10'>
			{train.map((e, i) => (
				<div
					key={i}
					className='flex flex-col lg:flex-row rounded-lg border-2 border-zinc-800 p-3 max-w-7xl mx-auto h-fit gap-6 bg-blur'
				>
					<div className='w-full h-72 sm:h-auto  lg:w-96  flex-shrink-0 relative rounded-lg border-4 border-zinc-800 mb-4 lg:mb-0'>
						<Image
							src={e.image}
							fill
							alt='image'
							className='object-cover rounded-lg'
							priority
							sizes='(min-width: 808px) 50vw, 100vw'
						/>
					</div>
					<div className='flex flex-col justify-between flex-grow'>
						<div>
							<div className='colorgold text-2xl lg:text-3xl flex  w-full text-center sm:text-start font-semibold pb-5'>
								<div>{e.title}</div>
								
							</div>
							<div className='text-sm text-zinc-300 flex gap-3'>
								<ClockIcon className='w-5 h-5' />
								<span>Длительность - {e.time} минут.</span>
							</div>
							<hr className='border-zinc-800' />
							<div className='py-2'>{e.descriptions}</div>
						</div>
						<div>
							<div className='text-sm text-zinc-300 flex gap-3 py-3'>
								<AcademicCapIcon className='w-5 h-5' />
								<span>Преподаватель - </span>
								<span className='uppercase'>{e.teacher}</span>
							</div>

							<div className='flex items-center'>
								<div className='w-full flex  '>
									<button className='mt-5 border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-1 flex space-x-16 duration-300 hover:bg-blur z-10  px-10 min-w-[200px] w-full lg:w-80 font-extrabold font-sans text-3xl'>
										{e.price}
										{e.currency}
									</button>
								</div>
							</div>
							<div className='text-[10px] pt-3'>*Для военных тренинг бесплатный </div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Trainings