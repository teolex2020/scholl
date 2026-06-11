import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getProductPrice } from '@/lib/priceCatalog'

export async function POST(req) {
	try {
		const { orderReference, productId, productName, orderDate, locale } =
			await req.json()

		if (!orderReference || !productId || !productName || !orderDate) {
			throw new Error(
				'Усі поля (orderReference, productId, productName, orderDate) є обов’язковими'
			)
		}

		// Ціна береться з серверного каталогу за id товару —
		// значення з клієнта не приймається
		const amount = getProductPrice(productId)
		if (!amount) {
			throw new Error('Невідомий товар або товар недоступний для оплати')
		}

		const account =
			process.env.MERCHANT_ACCOUNT || process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT
		const merchantDomainName =
			process.env.WAYFORPAY_DOMAIN || process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN
		// Секретний ключ — тільки серверна змінна, без префікса NEXT_PUBLIC_
		const wayforpaySecretKey = process.env.MERCHANT_SECRET_KEY

		if (!account || !merchantDomainName || !wayforpaySecretKey) {
			throw new Error('Відсутні необхідні змінні середовища')
		}

		// Колбек статусу від WayForPay. Домен той самий, що в підписі —
		// для локального тесту через ngrok достатньо виставити WAYFORPAY_DOMAIN
		// на свій ngrok-домен.
		const serviceUrl = `https://${merchantDomainName}/${
			locale || 'uk'
		}/api/status`

		const currency = 'UAH'
		const productCount = '1'

		const message = [
			account,
			merchantDomainName,
			orderReference,
			orderDate,
			amount,
			currency,
			productName,
			productCount,
			amount,
		].join(';')

		const merchantSignature = crypto
			.createHmac('md5', wayforpaySecretKey)
			.update(message)
			.digest('hex')

		// Повертаємо всі підписані поля — форма оплати рендериться саме з цієї
		// відповіді, тому розбіжність між підписом і формою неможлива
		return NextResponse.json({
			signature: merchantSignature,
			merchantAccount: account,
			merchantDomainName,
			orderReference,
			orderDate,
			amount,
			currency,
			productName,
			productCount,
			serviceUrl,
		})
	} catch (error) {
		console.error('Помилка в /api/createorder:', error)
		return NextResponse.json(
			{ error: true, message: error.message },
			{ status: 400 }
		)
	}
}
