"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import bg from "../../public/phon.png"
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })
import MovingCircle from './components/mouse/Mouse.jsx'
import { store } from '@/store/store'
import { Provider } from 'react-redux'


// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
		<html lang='en' className=' elem '>
			{/* <MovingCircle /> */}
			<body className={inter.className}>
				<div className='elem lg:min-h-screen  relative scroll flex flex-col justify-between '>
					<Image
						src={bg}
						alt='bg'
						fill
						priority={true}
						className='object-cover opacity-[0.8%]  '
					/>
					<Provider store={store}>
					<Header />
						<div className='flex-1'> {children}</div>
						<Footer />
					</Provider>
				</div>
			</body>
		</html>
	)
}
