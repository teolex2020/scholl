import { NextResponse } from 'next/server'
import { firestore } from 'firebase-admin'
import { initAdmin } from '@/firebase/db/firebaseAdmin'
import nodemailer from 'nodemailer'
require('dotenv').config()

export async function POST(req) {
	const username = process.env.NEXT_PUBLIC_PERSONAL_EMAIL
	const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD

    // const usernametest = process.env.PERSONAL_EMAIL
	// 	const passwordtest = process.env.BURNER_PASSWORD

    //     console.log('usernametest', usernametest)
    //     console.log('passwordtest', passwordtest)

        if (!username || !password) {
					console.error('EMAIL env missing')
					return NextResponse.json(
						{ error: 'SMTP credentials missing' },
						{ status: 500 }
					)
				}


	const emailSentStatus = 'emailSent'

	const {
		orderReference,
		reason,
		clientName,
		processingDate,
		email,
		amount,
		userdata,
		firstName,
		timeStamp,
	} = await req.json()

	if (reason === 'Cardholder session expired') {
		return NextResponse.json(
			{ error: 'Cardholder session expired' },
			{ status: 400 }
		)
	}

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
		subject: '✅ Оплата пройшла успішно! | Школа Руслана Бортніка',
		html: `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Підтвердження оплати</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); padding: 40px 30px; text-align: center;">
                            <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 48px;">✓</span>
                            </div>
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Оплата успішна!</h1>
                            <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px;">Замовлення №${orderReference}</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #2c3e50; font-size: 18px; margin: 0 0 20px 0; font-weight: 500;">
                                Шановний(-а) ${firstName},
                            </p>

                            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Щиро дякуємо за вашу підписку! Ваш вибір є важливим визнанням нашої професійної майстерності, що мотивує нас разом підкоряти нові професійні вершини.
                            </p>

                            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-left: 4px solid #27ae60; padding: 20px; margin: 30px 0; border-radius: 8px;">
                                <p style="color: #2c3e50; font-size: 15px; line-height: 1.6; margin: 0;">
                                    <strong>💡 Це означає, що ми з вами розділяємо спільні цінності:</strong><br/>
                                    Ми прагнемо до знань та нової інформації, ставимо під сумнів та критично аналізуємо нашу навколишню дійсність і змінюємо її.
                                </p>
                            </div>

                            <!-- Order Details -->
                            <table width="100%" cellpadding="12" cellspacing="0" style="margin: 30px 0; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
                                <tr>
                                    <td colspan="2" style="background-color: #27ae60; color: white; font-weight: 600; padding: 15px; border-radius: 8px 8px 0 0;">
                                        📋 Деталі замовлення
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #666; padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Номер замовлення:</td>
                                    <td style="color: #2c3e50; font-weight: 600; padding: 12px 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">${orderReference}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">Дата оплати:</td>
                                    <td style="color: #2c3e50; font-weight: 600; padding: 12px 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">${timeStamp}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; padding: 12px 15px;">Сума:</td>
                                    <td style="color: #27ae60; font-weight: 700; font-size: 18px; padding: 12px 15px; text-align: right;">${amount} грн</td>
                                </tr>
                            </table>

                            <!-- Important Info Box -->
                            <div style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <p style="color: #856404; font-size: 15px; line-height: 1.6; margin: 0;">
                                    <strong>⏰ Важлива інформація:</strong><br/>
                                    Очікуйте посилання для участі на платформі Zoom у вашому особистому кабінеті "Мої покупки"
                                    <strong style="color: #d39e00;">за 1-3 дні до початку</strong> заходу/курсу/тренінгу, або отримаєте автоматичний доступ до відео, якщо захід вже розпочався.
                                </p>
                            </div>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin: 35px 0;">
                                <a href="${
																	process.env.NEXT_PUBLIC_BASE_URL ||
																	'https://www.bortnikshool.com'
																}" style="display: inline-block; background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3); transition: all 0.3s;">
                                    🎓 Перейти в особистий кабінет
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- Support Section -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; border-top: 1px solid #e0e0e0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" style="padding-right: 15px; vertical-align: top;">
                                        <div style="background-color: white; padding: 20px; border-radius: 8px; height: 100%; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                            <p style="color: #27ae60; font-weight: 600; margin: 0 0 10px 0; font-size: 14px;">📧 Організаційні питання</p>
                                            <p style="color: #666; font-size: 14px; margin: 0;">
                                                <a href="mailto:bortnikschool@gmail.com" style="color: #27ae60; text-decoration: none;">bortnikschool@gmail.com</a>
                                            </p>
                                        </div>
                                    </td>
                                    <td width="50%" style="padding-left: 15px; vertical-align: top;">
                                        <div style="background-color: white; padding: 20px; border-radius: 8px; height: 100%; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                            <p style="color: #3498db; font-weight: 600; margin: 0 0 10px 0; font-size: 14px;">🛠 Технічна підтримка</p>
                                            <p style="color: #666; font-size: 14px; margin: 0;">
                                                <a href="mailto:placestudyyip@gmail.com" style="color: #3498db; text-decoration: none;">placestudyyip@gmail.com</a>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2c3e50; padding: 30px; text-align: center; color: white;">
                            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                                З найкращими побажаннями,
                            </p>
                            <p style="margin: 0; font-size: 15px; opacity: 0.9;">
                                Команда школи політичного аналізу<br/>
                                <strong>Руслана Бортніка</strong>
                            </p>
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                                <p style="margin: 0; font-size: 12px; opacity: 0.7;">
                                    © ${new Date().getFullYear()} Школа Руслана Бортніка. Всі права захищені.
                                </p>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
	`,
	}

	try {
		await initAdmin()

		const docRef = firestore().collection('order').doc(orderReference)
		const orderDocSnap = await docRef.get()

		// Check if the email has already been sent.
		if (orderDocSnap.exists && orderDocSnap.data()[emailSentStatus]) {
			return NextResponse.json(
				{ message: 'Email has already been sent' },
				{ status: 200 }
			)
		}

		await docRef.update(
			{
				reason,
				clientName,
				processingDate,
				amount,
				[emailSentStatus]: true, // Set the email sent flag to true.
			},
			{ merge: true }
		)
if(reason === "Ok") {
	// console.log('Sending email for', orderReference)
	await transporter.sendMail(mailOptions)
	await docRef.update({ [emailSentStatus]: true }, { merge: true })
}
	
		return NextResponse.json(
			{ message: 'Success: email was sent' },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
