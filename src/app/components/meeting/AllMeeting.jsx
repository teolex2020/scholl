'use client'
import React, { useState } from 'react'
import CartCourse from './CartTraining'
import { useLocale, useTranslations } from 'next-intl'
import { coursesua } from './language/meetua'
import { coursesen } from './language/meeten'
import { coursesru } from './language/meetru'
import Search from '../Search/Search'


const Allcourse = () => {
	const locale = useLocale()
	const t = useTranslations('Meeting')

	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,
	}
	const [searchQuery, setSearchQuery] = useState('')

	const currentCourses = courses[locale] || coursesua

	const filteredCourses = currentCourses
		.filter(
			(course) =>
				course.lector.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.reverse()

	return (
		<div className='container mx-auto '>
			<div className='w-full text-center text-sm text-slate-400 pt-2'>{t('takeout')}.</div>
			<div className='py-3'>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>

			<div className='lg:p-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10  place-items-center '>
				{filteredCourses.map((course, i) => (
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
				))}
			</div>
		</div>
	)
}

export default Allcourse
