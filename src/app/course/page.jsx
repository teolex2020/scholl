import React from 'react'
import dynamic from 'next/dynamic'
const Course = dynamic(() => import('../components/course/Course.jsx'), {
	loading: () => <div className='w-full text-center '></div>,
})




const page = () => {
	return (
		<div className='container mx-auto z-10 max-w-[1440px] '>
			<div className='w-full text-center text-xs text-zinc-500'>
				<p>
					Здесь Вы найдете курсы, занятия, треннинги и лекция от Руслана
					Бортника, и других известных ученных и экспертов Украины и зарубежья.
				</p>
			</div>

			<div className='w-full text-center'>
				<Course />
			</div>
		</div>
	)
}
export default page