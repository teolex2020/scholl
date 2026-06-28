'use client'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

// Спільна оболонка для сторінок логіну та реєстрації.
// Ліворуч — брендова панель (тільки на десктопі), праворуч — форма.
const AuthShell = ({ t, children }) => {
	const benefits = [t('benefit1'), t('benefit2'), t('benefit3')]

	return (
		<div className='relative z-10 w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10'>
			<div className='w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-zinc-800 shadow1 bg-[#11171c]/90'>
				{/* Брендова панель */}
				<div className='hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#e2a550]/15 via-[#11171c] to-[#0d1217]'>
					<div>
						<h2 className='text-[#e2a550] font-serif font-bold text-2xl leading-snug'>
							{t('brandTitle')}
						</h2>
						<p className='text-slate-400 mt-4 leading-relaxed'>
							{t('brandText')}
						</p>
					</div>
					<ul className='mt-10 space-y-4'>
						{benefits.map((b, i) => (
							<li key={i} className='flex items-start gap-3 text-slate-300'>
								<CheckBadgeIcon className='h-6 w-6 shrink-0 text-green-500' />
								<span className='text-sm'>{b}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Форма */}
				<div className='p-8 lg:p-10 flex flex-col justify-center'>{children}</div>
			</div>
		</div>
	)
}

export default AuthShell
