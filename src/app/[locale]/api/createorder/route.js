import { NextResponse } from 'next/server'
const crypto = require('crypto')
require('dotenv').config()

export async function POST(req) {
	const {
		orderId,
		price,
		productName,
		data,
		
	} = await req.json()

	const account = process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT
  const merchantDomainName = process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN
	const wayforpaySecretKey = process.env.NEXT_PUBLIC_MERCHANT_SECRET_KEY


	let merchant = account
	let productName1 = productName
	let productPrice1 = price
	let productCount1 = '1'
	let orderReference = orderId
	let orderDate = data
	let prices = price
	let currency = 'UAH'
	try {
		const message = [
			merchant,
			merchantDomainName,
			orderReference,
			orderDate,
			prices,
			currency,
			productName1,
			productCount1,
			productPrice1,
			].join(';')

		const merchantSignature = crypto
			.createHmac('md5', wayforpaySecretKey)
			.update(message)
			.digest('hex')

		


		

	 return NextResponse.json({ signature: merchantSignature })
	} catch (error) {
		return NextResponse.json({ error: true, message: error.message })
	}
}
