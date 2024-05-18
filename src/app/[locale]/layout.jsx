import {  Roboto } from 'next/font/google'
import './globals.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import bg from '../../../public/assets/phon.jpg'
import Image from 'next/image'
import { Providers } from '@/store/provider'
import Chat from '../components/chat/Chat'
import LocaleProvider from './provider'
import Script from 'next/script'


const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-ronoto',
	weight: ['400', '700', '900'],
})



export const metadata = {
	icons: {
		icon: '/assets/favicon-32x32.png',
	},

	title: {
		default: 'School of Political Analysis by Ruslan Bortnik',
	},
	description: 'School of Political Analysis by Ruslan Bortnik',
	verification: {
		google: 'google',
		facebook: 'facebook',
	},
}

export default function RootLayout({ children, params: { locale } }) {
	return (
		<html className=' elem ' lang={locale}>
	
				<head>
					<Script
						async
						src='https://www.googletagmanager.com/gtag/js?id=G-84W2FYYVKC'
					></Script>
					<Script id='google-analytics'>
						{`  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-84W2FYYVKC');`}
					</Script>
				</head>
	
			<body className={` `}>
				<Providers>
					<main
						className={`elem lg:min-h-screen  relative scroll flex flex-col justify-between h-full  ${roboto.className}`}
					>
						<Image
							src={bg}
							alt='bg'
							fill
							priority={true}
							className='bg-cover opacity-[0.8%]  '
						/>

						<LocaleProvider>
							<Header />

							<Chat lang={locale} />
							<div className='flex-1 '> {children}</div>
							<Footer />
						</LocaleProvider>
					</main>
				</Providers>
			</body>
		</html>
	)
}
