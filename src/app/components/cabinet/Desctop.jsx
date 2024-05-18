'use client'

import { useTranslations } from 'next-intl'



const Desctop = ({ data }) => {
	const t = useTranslations('Cabinetdata')

	


	

	return (
		<div>
			{' '}
			<table className='table-fixed w-full '>
				<thead className='text-sm  border-b  border-zinc-700/50'>
					<tr className=' text-lg '>
						<th className='flex '>
							{' '}
							<div className=' w-48 p-2 '>{t('theme')}</div>
						</th>
						<th className=' w-32 '>
							{' '}
							<div className=' p-2 w-32 '>{t('paid')}</div>
						</th>
					</tr>
				</thead>
				{data ? (
					data?.map((item, i) => (
						<tbody key={i} className=''>
							<tr className=' h-10'>
								<td className=' text-sm'>
									{i + 1}.&nbsp;&nbsp;{item.title}.
								</td>
								<td className='w-32 text-center'>
									{item?.reason == 'Ok' ? (
										<div
											className={`bg-green-700 text-sm rounded-sm px-2 py-1`}
										>
											Paid
										</div>
									) : (
										<div className={`bg-red-700 text-sm rounded-sm px-2 py-1`}>
											Not paid
										</div>
									)}
								</td>
							</tr>
						</tbody>
					))
				) : (
					<tbody className=''>
						<tr className=' h-20'>
							<td className=' text-sm'></td>
							<td className='w-32 text-center'>
								<div className=' text-sm rounded-sm px-2 py-1'></div>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default Desctop
