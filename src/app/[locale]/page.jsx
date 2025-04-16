'use server'

import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import CoursesSection from '@/app/components/TestStartPage/CourseSection'
import LecturesSection from '@/app/components/TestStartPage/LectureSection'
import AboutUsSection from '@/app/components/TestStartPage/AboutSection'
import HowToStart from '@/app/components/TestStartPage/HowtoStart'


import StartPage from '../components/startpage/StartPage.jsx'

const Home = ({ params: { locale } }) => {


	unstable_setRequestLocale(locale)
	const t = useTranslations('StartPage')
	return (
		<main className='text-white pb-10 container mx-auto md:px-32'>
			<StartPage
				title={t('title')}
				name={t('name')}
				descriptions={t('descriptions')}
				button={t('button')}
				info={t('info')}
			/>
			<CoursesSection />
			<LecturesSection />
			<HowToStart />
			<AboutUsSection />
		</main>
	)
}

export default Home
