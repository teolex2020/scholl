import React, { useState, useMemo } from 'react'

const domein = process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN
const account = process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT

const PaymentPage = ({
	merch,
	orderId,
	orderTitle,
	orderPrice,
	email,
	data,
	html_form
}) => {
	// const initialState = useMemo(
	// 	() => ({
	// 		merchantAccount: `test_merch_n1`,
	// 		merchantDomainName: `${process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN}`,
	// 		orderReference: `${orderId}`,
	// 		orderDate: data,
	// 		amount: `${orderPrice}`,
	// 		currency: 'UAH',
	// 		// orderTimeout: `49000`,
	// 		productName: `${orderTitle}`,
	// 		productPrice: `${orderPrice}`,
	// 		productCount: '1',
	// 		// clientFirstName: `${firstName}`,
	// 		// clientLastName: `${lastName}`,
	// 		// clientEmail: `${email}`,
	// 		defaultPaymentSystem: 'card',
	// 		language: 'uk',
	// 		merchantAuthType: 'SimpleSignature',
	// 		merchantSignature: `${merch}`,
	// 	}),
	// 	[
	// 		merch,
	// 		// firstName,
	// 		// lastName,
	// 		// email,
	// 		orderId,
	// 		orderTitle,
	// 		orderPrice,
	// 		data,
	// 	]
	// )

	// const [formData] = useState({ ...initialState })

	console.log('domein', domein)
	console.log('orderId', orderId)
	console.log('orderPrice', orderPrice)
	console.log('orderTitle', orderTitle)
	console.log('merch', merch)

	return (
		<div>
			{/* <form
				method='post'
				action='https://secure.wayforpay.com/pay'
				acceptCharset='utf-8'
				className='text-black flex flex-col'
			>
				{Object.entries(formData).map(([name, value]) =>
					Array.isArray(value) ? (
						value.map((val, index) => (
							<input
								key={`${name}[${index}]`}
								name={`${name}[${index}]`}
								value={val}
								// type='hidden'
								className='text-black'
							/>
						))
					) : (
						<input key={name} name={name} value={value} type='hidden' />
					)
				)}
				<button type='submit' value='Test'>
					Оплатити
				</button>
			</form> */}
			{/* <form
				className='text-black flex flex-col w-96'
				method='post'
				action='https://secure.wayforpay.com/pay'
				acceptCharset='utf-8'
			>
				<input name='merchantAccount' value='test_merch_n1' readOnly />
				<input name='merchantDomainName' value={domein} readOnly />
				<input name='orderReference' value={orderId} readOnly />
				<input name='amount' value={orderPrice} readOnly />
				<input name='currency' value='UAH' readOnly />
				<input name='orderTimeout' value='49000' readOnly />
				<input name='productName[]' value={orderTitle} readOnly />
				<input name='productCount[]' value='1' readOnly />
				<input name='productPrice[]' value={orderPrice} readOnly />
				<input name='orderDate' value={data} readOnly />
				<input name='clientEmail' value={email} />
				<input name='defaultPaymentSystem' value='card' readOnly />
				<input name='merchantSignature' value={merch} readOnly />
				<input name='merchantAuthType' value='SimpleSignature' readOnly />
				<input type='submit' value='Test' readOnly />
			</form> */}
			{html_form}
		</div>
	)
}

export default PaymentPage
