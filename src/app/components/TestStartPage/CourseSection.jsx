'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { coursesua } from '../course/language/coursesua'
import { coursesen } from '../course/language/coursesen'
import { coursesru } from '../course/language/coursesru'
import CartCourse from './CartCourse'
import Link from 'next/link'

const CoursesSection = () => {
	const locale = useLocale()
	const t = useTranslations('Menu')
	const [searchQuery, setSearchQuery] = useState('')

	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,
	}
	const currentCourses = courses[locale] || coursesua

	const filteredCourses = currentCourses
		.filter(
			(course) =>
				course.lector.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.reverse()
		.slice(0, 4)

	return (
		<section className='container mx-auto my-10 px-5'>
			<div className='flex justify-between items-center mb-5'>
				<h2 className='text-3xl  font-semibold'>{t('course')}</h2>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center'>
				{filteredCourses.length > 0 ? (
					filteredCourses.map((course, i) => (
						<CartCourse
							key={i}
							id={course.id}
							lector={course.lector}
							title={course.title}
							description={course.descriptions}
							price={course.price}
							status={course.status}
							image={course.image}
							course={course.course}
						/>
					))
				) : (
					<div className='w-full text-center text-xl text-gray-500'>
						Not found
					</div>
				)}
			</div>
			<Link
				href='/course'
				className='flex items-center justify-center gap-2 text-lg font-semibold text-[#e2a550]  border border-[#e2a550] p-2 rounded-lg hover:bg-[#e2a550] hover:text-white transition-all duration-300  mt-5 w-32'
			>
				View all{' '}
				<span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
						class='size-6'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
						/>
					</svg>
				</span>{' '}
			</Link>
		</section>
	)
}

export default CoursesSection
