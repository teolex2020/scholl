'use client'
import React, { useState } from 'react'
import CartCourse from './CartTraining'
import { useLocale } from 'next-intl'
import { coursesua } from './language/lecturesua'
import { coursesen } from './language/lecturesen'
import { coursesru } from './language/lecturesru'
import Search from '../Search/Search'

const Allcourse = () => {
	const locale = useLocale()
	const courses = {
		ua: coursesua,
		en: coursesen,
		ru: coursesru,
	}
	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8

	const currentCourses = courses[locale] || coursesua

	const filteredCourses = currentCourses
		.filter(
			(course) =>
				course.lector.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.reverse()

	// Calculate total pages
	const pageCount = Math.ceil(filteredCourses.length / itemsPerPage)

	// Get current items
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredCourses
		.slice(indexOfFirstItem, indexOfLastItem)
		
		

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	return (
		<div className='container mx-auto '>
			<div className='py-3'>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>
			<div className='lg:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 place-items-center '>
				{currentItems				
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
							active={course.active}
						/>
					))}
			</div>
			<div className='pagination flex justify-center space-x-2 mt-4 mb-10'>
				{Array.from({ length: pageCount }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`px-3 py-1 border-2 font-extrabold rounded z-10 cursor-pointer ${
							currentPage === i + 1
								? 'border-[#e2a550] text-[#e2a550] '
								: 'bg-white text-black'
						}`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	)
}

export default Allcourse
