"use server"
import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
const StartPage = dynamic(
	() => import('../components/startpage/StartPage.jsx'),
	{
		loading: () => (
			<div className='w-screen h-screen flex justify-center items-center'>
				<div className='loader'></div>
			</div>
		),
	}
)

 const Home = ({ params: { locale } }) => {

const data = (global).payload
console.log("cach",data)

	 unstable_setRequestLocale(locale)
		const t = useTranslations('StartPage')
		return (
			<>
				<StartPage
					title={t('title')}
					name={t('name')}
					descriptions={t('descriptions')}
					button={t('button')}
				/>
			</>
		)
 }

export default Home