import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req) {
	try {
		const { orderId, price, productName, data, customer, locale } =
			await req.json()

		if (!orderId || !price || !productName || !data || !customer) {
			throw new Error('Missing required order fields')
		}

		const amount = Number(price)
		if (Number.isNaN(amount)) {
			throw new Error('Field price must be a number')
		}

		const account = process.env.MERCHANT_ACCOUNT
		const merchantDomainName = process.env.WAYFORPAY_DOMAIN
		const wayforpaySecretKey = process.env.MERCHANT_SECRET_KEY
		const baseUrl =
			process.env.BASE_URL || `https://${merchantDomainName}` || ''

		if (!account || !merchantDomainName || !wayforpaySecretKey) {
			throw new Error('Missing WayForPay environment variables')
		}

		const productCount = '1'
		const currency = 'UAH'
		const orderReference = String(orderId)
		const orderDate = String(data)
		const productTitle = String(productName)
		const productPrice = amount.toFixed(2)

		const signatureBase = [
			account,
			merchantDomainName,
			orderReference,
			orderDate,
			productPrice,
			currency,
			productTitle,
			productCount,
			productPrice,
		].join(';')

		const merchantSignature = crypto
			.createHmac('md5', wayforpaySecretKey)
			.update(signatureBase)
			.digest('hex')

		return NextResponse.json({
			paymentData: {
				merchantAccount: account,
				merchantAuthType: 'SimpleSignature',
				merchantDomainName,
				orderReference,
				orderDate,
				amount: productPrice,
				currency,
				orderTimeout: '49000',
				productName: [productTitle],
				productPrice: [productPrice],
				productCount: [productCount],
				defaultPaymentSystem: 'card',
				merchantSignature,
				serviceUrl: `${baseUrl}/${locale || 'uk'}/api/status`,
				orderLifetime: '600',
				clientFirstName: customer.firstName ?? '',
				clientLastName: customer.lastName ?? '',
				clientEmail: customer.email ?? '',
				clientPhone: customer.phone ?? '',
			},
		})
	} catch (error) {
		console.error('Error in /api/createorder:', error)
		return NextResponse.json(
			{ error: true, message: error.message },
			{ status: 400 }
		)
	}
}
