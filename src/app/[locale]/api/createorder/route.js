import { NextResponse } from 'next/server'
const crypto = require('crypto')
require('dotenv').config()

export async function POST(req) {
	const { orderId, price, productName, data, email } = await req.json()
	const domain = process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN
	// const account = process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT
	// const testAccount = 'test_merch_n1'
	// const testSecretKey = 'flk3409refn54t54t*FNJRET'
	// const wayforpaySecretKey = process.env.NEXT_PUBLIC_MERCHANT_SECRET_KEY
	const currency = 'UAH'
	const productCount = 1
	try {
		const message = `test_merch_n1;${domain};${orderId};${price};${currency};${productName};${productCount};${price}`

		const merchantSignature = crypto
			.createHmac('md5', 'flk3409refn54t54t*FNJRET')
			.update(message)
			.digest('hex')

		const html_form = `<form
				className='text-white flex flex-col w-96'
				method='post'
				action='https://secure.wayforpay.com/pay'
				acceptCharset='utf-8'
			>
				<input name='merchantAccount' value='test_merch_n1' readOnly />
				<input name='merchantDomainName' value="${domain}" readOnly />
				<input name='orderReference' value="${orderId}" readOnly />
				<input name='amount' value="${price}" readOnly />
				<input name='currency' value="${currency} readOnly />
				<input name='orderTimeout' value='49000' readOnly />
				<input name='productName[]' value="${productName}" readOnly />
				<input name='productCount[]' value='1' readOnly />
				<input name='productPrice[]' value="${price}" readOnly />
				<input name='orderDate' value="${data}" readOnly />
				<input name='clientEmail' value="${email}" />
				<input name='defaultPaymentSystem' value='card' readOnly />
				<input name='merchantSignature' value="${merchantSignature}" readOnly />
				<input name='merchantAuthType' value='SimpleSignature' readOnly />
				<input type='submit' value='Test' readOnly />
			</form>`

		console.log('signature', html_form)
		console.log('message', message)

		return NextResponse.json({ signature: html_form })
	} catch (error) {
		return NextResponse.json({ error: true, message: error.message })
	}
}
