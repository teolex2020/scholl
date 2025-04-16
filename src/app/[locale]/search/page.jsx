'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import CartSearch from '@/app/components/TestStartPage/CartSearch'

import { Link, useRouter } from '@/navigation'

import { coursesua } from '../../components/course/language/coursesua.js'
import { coursesen } from '../../components/course/language/coursesen.js'
import { coursesru } from '../../components/course/language/coursesru.js'
import {coursesua as lecturesua } from '../../components/lectures/language/lecturesua.js'
import {coursesen as lecturesen } from '../../components/lectures/language/lecturesen.js'
import {coursesru as lecturesru } from '../../components/lectures/language/lecturesru.js'

const SearchPage = () => {
	const searchParams = useSearchParams()
	const query = searchParams.get('q')?.toLowerCase() || ''
	const [results, setResults] = useState([])

	

	useEffect(() => {
		// Якщо раптом якісь з джерел — об'єкти, перетворимо на масиви
		const allItems = [
			...(Array.isArray(coursesua) ? coursesua : Object.values(coursesua)),
			...(Array.isArray(coursesen) ? coursesen : Object.values(coursesen)),
			...(Array.isArray(coursesru) ? coursesru : Object.values(coursesru)),
			...(Array.isArray(lecturesua) ? lecturesua : Object.values(lecturesua)),
			...(Array.isArray(lecturesen) ? lecturesen : Object.values(lecturesen)),
			...(Array.isArray(lecturesru) ? lecturesru : Object.values(lecturesru)),
		]

		const fuse = new Fuse(allItems, {
			keys: ['title', 'lector', 'descriptions'],
			includeScore: true,
			threshold: 0.4,
		})

		const fuseResults = fuse.search(query).map((r) => r.item)
		setResults(fuseResults)
	}, [query])

	const router = useRouter()

	console.log(results)

	return (
		<div className='max-w-[1400px] mx-auto py-10 px-5'>
		
			<h1 className='text-2xl font-bold mb-6 text-white'>
				Результати пошуку: <span className='text-[#e2a550]'>{query}</span>
			</h1>
			<div>
				{' '}
				{results.length > 0 ? (
					<div className='flex flex-wrap gap-4'>
						{results.map((item, i) => (
							<CartSearch
								key={i}
								lector={item.lector}
								title={item.title}
								id={item.id}
								image={item.image}
							/>
						))}
					</div>
				) : (
					<p className='text-center text-gray-500 mt-10'>Нічого не знайдено.</p>
				)}
			</div>

			<div className='z-50'>
				<button
					onClick={() => router.back()}
					className='flex items-center justify-center gap-2 text-lg font-semibold text-[#e2a550] border border-[#e2a550] p-2 rounded-lg hover:bg-[#e2a550] hover:text-white transition-all duration-300 mt-5 w-fit hover:scale-105  relative pointer-events-auto'
				>
					Повернутись на головну сторінку
				</button>
			</div>
		</div>
	)
}
export default SearchPage