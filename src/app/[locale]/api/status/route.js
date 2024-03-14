import { NextResponse } from 'next/server'
import { firestore } from 'firebase-admin'
import { initAdmin } from '@/firebase/db/firebaseAdmin'
import nodemailer from 'nodemailer'
require('dotenv').config()

export async function POST(req) {
	const username = process.env.NEXT_PUBLIC_PERSONAL_EMAIL
	const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD

	const data = await req.json()

	const {
		orderReference,
		reason,
		clientName,
		processingDate,
		email,
		amount,
		userdata,
	} = data

	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,

		auth: {
			user: username,
			pass: password,
		},
	})

	const mailOptions = {
		from: username,
		to: email,
		subject: 'Оплата пройшла успішно!',
		html: `
        <div style="font-family: Arial, sans-serif; text-align: start; padding: 40px;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; background-color: #ecf0f1; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
       <div style="text-align: center;">
         
          <h1 style="color: #27ae60; margin-bottom: 5px;">Вітаємо з успішною оплатою замовлення № ${orderReference}</h1>
        </div>
       
         <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         Шановний ${clientName},
        </p>
          
        <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         Щиро дякую  за вашу підписку. Ваш вибір є важливим визнанням моєї професійної майстерності, що мотивує нас разом підкоряти нові професійні вершини.
        </p>
        
        <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         Також це означає, що ми з Вами вже розділяємо спільні цінності  - прагнемо до знань та нової інформації, ставимо під сумнів та критично аналізуємо нашу навколишню дійсність, та змінюємо її.
        </p>
        <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         Будь ласка, очікуйте на посилання для участі на платформі Zoom, яке ми надішлемо вам за <strong style="color: #27ae60; margin-bottom: 5px; text-decoration: underline;"> 1-3 дні </strong> до початку заходу.
        </p>
         <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         З організаційних питань: email: bortnikschool@gmail.com.  
        </p>
         <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
         Для технічної підтримки: email: placestudyyip@gmail.com.
        </p>
       
       
       
         <p style="color: #34495e; font-size: 14px; margin-top: 30px; ">
       
<strong>З найкращими побажаннями,</strong>
 <br/>
<strong>Команда школи політичного аналізу</strong>
<br/>
<strong>Руслана Бортніка</strong>

        </p>
      </div>
    </div>
  `,
	}

	try {
		await initAdmin()

		const docRef = firestore().collection('order').doc(orderReference)
		const docSnap = await docRef.get()

		// console.log('docSnap', docSnap)

		if (docSnap.data().orderReference) {
			return NextResponse.json(
				{ message: 'Email has already been sent' },
				{ status: 200 }
			)
		} else {
			await firestore().collection('order').doc(orderReference).update({
				orderReference: orderReference,
				reason: reason,
				clientName: clientName,
				processingDate: processingDate,
				amount: amount,
			})

			transporter.sendMail(mailOptions)

			return NextResponse.json(
				{ message: 'Success: email was sent' },
				{ status: 200 }
			)
		}
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
