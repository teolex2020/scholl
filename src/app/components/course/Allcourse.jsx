"use client"
import React, { useState } from 'react'
import CartCourse from './CartCourse'
import {  useLocale } from 'next-intl'
import { coursesua } from './language/coursesua'
import { coursesen } from './language/coursesen'
import { coursesru } from './language/coursesru'
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

	 const filteredCourses = currentCourses
			.filter(
				(course) =>
					course.lector.toLowerCase().includes(searchQuery.toLowerCase()) ||
					course.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
			.reverse()

		

	return (
		<div className='container mx-auto'>
			<div className='py-3'>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>

			<div className='lg:p-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  place-items-center '>
				{filteredCourses.length > 0 ? (
					filteredCourses
					
						.map((course, i) => (
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
		</div>
	)
}

export default Allcourse
