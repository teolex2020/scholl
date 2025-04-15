import React from 'react'
import HeroBanner from '@/app/components/TestStartPage/HerroBanner'
import CoursesSection from '@/app/components/TestStartPage/CourseSection'
import LecturesSection from '@/app/components/TestStartPage/LectureSection'
import AboutUsSection from '@/app/components/TestStartPage/AboutSection'
import TestimonialsCarousel from '@/app/components/TestStartPage/TestimonialsCarousel'
import StartPage from '@/app/components/startpage/StartPage'
import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

const page = () => {
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
			<HeroBanner />
			<CoursesSection />
			<LecturesSection />
			<AboutUsSection />
			{/* <TestimonialsCarousel /> */}
		</main>
	)
}
 
export default page