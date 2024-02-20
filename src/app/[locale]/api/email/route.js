// import { NextResponse } from 'next/server'
// const nodemailer = require('nodemailer')
// require('dotenv').config()
// const path = require('path')

// export async function POST(req) {
// 	const username = process.env.NEXT_PUBLIC_PERSONAL_EMAIL
// 	const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD

// 	const transporter = nodemailer.createTransport({
// 		service: 'Gmail',
// 		host: 'smtp.gmail.com',
// 		port: 465,
// 		secure: true,

// 		auth: {
// 			user: username,
// 			pass: password,
// 		},
// 	})

// const mailOptions = {
// 	from: 'bortnikschool@gmail.com',
// 	to: 'placestudyyip@gmail.com',
// 	subject: 'Оплата пройшла успішно!',
// 	html: `
//       <div style="font-family: Arial, sans-serif; text-align: start; padding: 40px;">
//       <div style="max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; background-color: #ecf0f1; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//        <div style="text-align: center;">
         
//           <h1 style="color: #27ae60; margin-bottom: 5px;">Вітаємо з успішною оплатою замовлення №6546444646465</h1>
//         </div>
       
          
//         <p style="color: #34495e; font-size: 16px; margin-bottom: 30px;">
//           В наступному повідомленню, Ви отримаєте іструкцію та відповідні посилання, щодо Вашого замовлення
//         </p>
       
       
//         <p style="color: #34495e; font-size: 16px; margin-top: 30px;">
//          Ми пишаємося тим, що допомагаємо людям досягати їхніх освітніх та професійних цілей. Бажаємо вам успіхів у навчанні та впевнені, що отримані знання стануть цінним доповненням до вашого професійного розвитку.


//         </p>
//          <p style="color: #34495e; font-size: 14px; margin-top: 30px; ">
       
// <strong>З найкращими побажаннями,</strong>
//  <br/>
// <strong>Команда школи політичного аналізу</strong>
// <br/>
// <strong>Руслана Бортніка</strong>

//         </p>
//       </div>
//     </div>
//   `,
// 	// attachments: [
// 	// 	{
// 	// 		filename: 'success.png',
// 	// 		path: path.join(process.cwd(), '/public/assets/success.png'),
// 	// 		cid: 'successImage', //same cid value as in the html img src
// 	// 	},
// 	// ],
// }


// 	try {
	
// 		  transporter.sendMail(mailOptions, (error, info) => {
// 				if (error) {
// 					console.error('Error sending email: ', error)
// 				} else {
// 					NextResponse.json('Email sent: ', info.response)
// 				}
// 			})

// 		return NextResponse.json(
// 			{ message: 'Success: email was sent' },
// 			{ status: 200 }
// 		)
// 	} catch (error) {
// 		return NextResponse.json({ error: error }, { status: 500 })
// 	}
// }
