"use client"
import { useState } from 'react'
import {
	ChevronDoubleDownIcon,
	FireIcon,
	AcademicCapIcon,
} from '@heroicons/react/24/solid'
const Accordion = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className=' flex  items-start flex-col text-left cursor-pointer  z-10'>
			<div className=' flex gap-3 ' onClick={toggleOpen}>
				<div>
					<ChevronDoubleDownIcon
						className={`h-6 w-6 text-green-500  ${
							isOpen
								? 'rotate-180 transition duration-700 ease-in-out'
								: 'rotate-0 transition duration-700 ease-in-out'
						}`}
					/>
				</div>
				<div className='md:text-lg'>{title}</div>
			</div>
			<div
				className={` text-base
 ${
		isOpen
			? 'h-fit transition duration-700 ease-in-out'
			: 'h-0 transition duration-700 ease-in-out'
 } overflow-hidden`}
			>
				{isOpen && children}
			</div>
		</div>
	)
}

export default Accordion