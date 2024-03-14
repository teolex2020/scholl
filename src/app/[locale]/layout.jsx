
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import bg from '../../../public/assets/phon.jpg'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from '@/store/provider'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation' 
import Chat from '../components/chat/Chat'



// export const metadata = {
// 	title: 'School',
// 	description: 'Generated by create next app',
// }

export async function generateMetadata(){
	return {
		 icons: {
      icon: '/assets/favicon-32x32.png'},
	
		  title: {
      default:'School of Political Analysis by Ruslan Bortnik'}
		 }
}


export default async function RootLayout({ children, params: { locale } }) {
  let messages
	try {
		messages = (await import(`../../../messages/${locale}.json`)).default
	} catch (error) {
		notFound()
	}



	return (
		<html className=' elem ' lang={locale}>
			{/* <MovingCircle /> */}
			<body className={inter.className}>
				<main className='elem lg:min-h-screen  relative scroll flex flex-col justify-between  '>
					<Image
						src={bg}
						alt='bg'
						fill
						priority={true}
						className='bg-cover opacity-[0.8%]  '
					/>
					{/* <Provider store={store}> */}
					<Providers>
						<NextIntlClientProvider locale={locale} messages={messages}>
							<Header />
					
							<Chat lang={locale} />
							<div className='flex-1 flex-grow'> {children}</div>
							<Footer />
						</NextIntlClientProvider>
					</Providers>
					{/* </Provider> */}
				</main>
			</body>
		</html>
	)
}
