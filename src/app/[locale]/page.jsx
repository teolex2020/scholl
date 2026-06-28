'use server'

import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import CoursesSection from '@/app/components/TestStartPage/CourseSection'
import LecturesSection from '@/app/components/TestStartPage/LectureSection'
import AboutUsSection from '@/app/components/TestStartPage/AboutSection'
import HowToStart from '@/app/components/TestStartPage/HowtoStart'


import StartPage from '../components/startpage/StartPage.jsx'
import DiscountBanner from '../components/discountBanner/DiscountBanner.jsx'

const Home = ({ params: { locale } }) => {


	unstable_setRequestLocale(locale)
	const t = useTranslations('StartPage')
	return (
		<main className='text-white pb-10 container mx-auto md:px-32'>
			<DiscountBanner/>
			<StartPage
				title={t('title')}
				name={t('name')}
				descriptions={t('descriptions')}
				benefits={[t('benefit1'), t('benefit2'), t('benefit3')]}
				button={t('button')}
				buttonSecondary={t('buttonSecondary')}
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
