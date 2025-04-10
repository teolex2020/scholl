import React from 'react'
import HeroBanner from '@/app/components/TestStartPage/HerroBanner'
import CoursesSection from '@/app/components/TestStartPage/CourseSection'
import LecturesSection from '@/app/components/TestStartPage/LectureSection'
import AboutUsSection from '@/app/components/TestStartPage/AboutSection'
import TestimonialsCarousel from '@/app/components/TestStartPage/TestimonialsCarousel'

const page = () => {
 
  return (
		<main className='text-white pb-10 container mx-auto md:px-32'>
			<HeroBanner />
			<CoursesSection />
			<LecturesSection />
			<AboutUsSection />
			<TestimonialsCarousel />
		</main>
	)
}
 
export default page