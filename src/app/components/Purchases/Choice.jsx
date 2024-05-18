"use client"
import React, {useState} from 'react'




const Choice = ({ button, active, choice }) => {
	

	return (
		<div className='container mx-auto flex-col md:flex-row flex gap-4 md:pt-10  px-3 md:px-0 mt-10 md:nt-0'>
			{button.map((e) => (
				<button
					key={e.id}
					className={`border-2 border-zinc-700 rounded-lg px-10 py-2 bg-blur h-16 md:h-12 hover:shadow1 ${
						active === e.id ? 'shadow1' : ''
					}`}
					onClick={() => choice(e.id)}
				>
					{e.title}
				</button>
			))}
		</div>
	)
}

export default Choice