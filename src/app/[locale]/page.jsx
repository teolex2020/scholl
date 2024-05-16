'use server'

import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'


import StartPage from '../components/startpage/StartPage.jsx'

const Home = ({ params: { locale } }) => {
	const data = global.payload

	unstable_setRequestLocale(locale)
	const t = useTranslations('StartPage')
	return (
		<>
			<StartPage
				title={t('title')}
				name={t('name')}
				descriptions={t('descriptions')}
				button={t('button')}
				info={t('info')}
			/>
		</>
	)
}

export default Home
