'use client'
import React, { useState } from 'react'
import CartCourse from './CartTraining'
import { useLocale } from 'next-intl'
import { coursesua } from './language/trainingua'
import { coursesen } from './language/trainingen'
import { coursesru } from './language/trainingru'
import Search from '../Search/Search'

const Allcourse = () => {
	const locale = useLocale()

	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,


	}
	const [searchQuery, setSearchQuery] = useState('') 

	const currentCourses = courses[locale] || coursesua

	const filteredCourses = currentCourses.filter(
		(course) =>
			course.lector.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className='container mx-auto'>
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
