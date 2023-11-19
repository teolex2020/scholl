"use client"
import React, { useEffect } from 'react'

const MovingCircle = () => {
	useEffect(() => {
		const handleMouseMove = (event) => {
			const circle = document.getElementById('movingCircle')
			circle.style.left = `${event.clientX}px`
			circle.style.top = `${event.clientY}px`
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<div
			id='movingCircle'
			className='absolute bg-blue-300 -mx-20 -my-20 w-48 h-48 blur-3xl rounded-full opacity-[10%] flex justify-center items-center z-0' 
		></div>
	)
}

export default MovingCircle
