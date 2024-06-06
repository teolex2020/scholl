import React, { useEffect, useRef } from 'react'
import { BellAlertIcon } from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from 'react-redux'
import { PopupBell } from '@/store/features/counterSlice'
import { useTranslations } from 'next-intl'

const Popupbell = () => {
	const t = useTranslations('Popup')
	const dispatch = useDispatch()
	const popupBell = useSelector((state) => state.counter.popupBell)
	

		

	const popup = () => {
		dispatch(PopupBell(popupBell))
	}

	return (
		<div
			className='fixed left-0 right-0 bottom-0 top-0 flex justify-end pt-20 '
			onClick={popup}
		>
			<div
				className='flex flex-col justify-center items-center py-3  cursor-pointer duration-300 bg-blur rounded-md p-5 z-50 bg-menublur w-72 h-96 mr-[5%] '
				onClick={(e) => e.stopPropagation()}
			>
				<BellAlertIcon className='w-48 h-48 stroke-zinc-200 fill-none ' />
				<div className='text-center'>{t('description')}</div>
			</div>
		</div>
	)
}

export default Popupbell
