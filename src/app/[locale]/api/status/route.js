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
          В наступному повідомленню, Ви отримаєте іструкцію та відповідні посилання, щодо Вашого замовлення
        </p>
       
       
        <p style="color: #34495e; font-size: 16px; margin-top: 30px;">
         Ми пишаємося тим, що допомагаємо людям досягати їхніх освітніх та професійних цілей. Бажаємо вам успіхів у навчанні та впевнені, що отримані знання стануть цінним доповненням до вашого професійного розвитку.


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
		await firestore().collection('order').doc(orderReference).update({
			orderReference: orderReference,
			reason: reason,
			clientName: clientName,
			processingDate: processingDate,
		})

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error('Error sending email: ', error)
			} else {
				NextResponse.json('Email sent: ', info.response)
			}
		})

		return NextResponse.json(
			{ message: 'Success: email was sent' },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
