"use client"

import { useSelector, useDispatch } from 'react-redux'
import { Selectcourse } from '@/store/features/counterSlice'

const Selectbutton = () => {
const dispatch=useDispatch()
 const active = useSelector((state) => state.counter.selectcourse)

  const butactive = [
		{ id: 1, title: 'Course' },
		{ id: 2, title: 'Training' },
	]
  
  const choose =(e)=>{
    dispatch(Selectcourse(e))
  } 

  return (
		<div className='flex justify-around pb-2 gap-x-5'>
			{butactive.map((e) => (
				<button key={e.id} onClick={()=>choose(e.id)}
					className={`px-4 py-1 rounded-lg bg-blur ${
						active===e.id ? 'text-[#e2a550] underline decoration-[#e2a550]' : ''
					} `}
				>
					{e.title}
				</button>
			))}

		
		</div>
	)
}

export default Selectbutton