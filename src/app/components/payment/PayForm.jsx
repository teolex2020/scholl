'use client'
import { useEffect, useRef } from 'react'

// Прихована форма WayForPay. Всі підписані поля приходять з /api/createorder
// одним об'єктом `pay`, тому вони гарантовано збігаються з підписом.
// Форма сабмітиться автоматично одразу після рендеру — другий клік не потрібен.
const PayForm = ({ pay, client }) => {
	const formRef = useRef(null)

	useEffect(() => {
		formRef.current?.submit()
	}, [])

	return (
		<form
			ref={formRef}
			method='post'
			action='https://secure.wayforpay.com/pay'
			acceptCharset='utf-8'
			className='hidden'
		>
			<input
				name='merchantAccount'
				value={pay.merchantAccount}
				readOnly
				type='hidden'
			/>
			<input
				name='merchantAuthType'
				value='SimpleSignature'
				readOnly
				type='hidden'
			/>
			<input
				name='merchantDomainName'
				value={pay.merchantDomainName}
				readOnly
				type='hidden'
			/>
			<input
				name='orderReference'
				value={pay.orderReference}
				readOnly
				type='hidden'
			/>
			<input name='orderDate' value={pay.orderDate} readOnly type='hidden' />
			<input name='amount' value={pay.amount} readOnly type='hidden' />
			<input name='currency' value={pay.currency} readOnly type='hidden' />
			<input name='orderTimeout' value='49000' readOnly type='hidden' />
			<input
				name='productName[]'
				value={pay.productName}
				readOnly
				type='hidden'
			/>
			<input
				name='productPrice[]'
				value={pay.amount}
				readOnly
				type='hidden'
			/>
			<input
				name='productCount[]'
				value={pay.productCount}
				readOnly
				type='hidden'
			/>
			<input
				name='merchantSignature'
				value={pay.signature}
				readOnly
				type='hidden'
			/>
			<input
				name='defaultPaymentSystem'
				value='card'
				readOnly
				type='hidden'
			/>
			<input
				name='serviceUrl'
				value={pay.serviceUrl}
				readOnly
				type='hidden'
			/>
			<input name='orderLifetime' value='3600' readOnly type='hidden' />

			<input name='clientEmail' value={client.email} readOnly type='hidden' />
			<input
				name='clientFirstName'
				value={client.firstName}
				readOnly
				type='hidden'
			/>
			<input
				name='clientLastName'
				value={client.lastName}
				readOnly
				type='hidden'
			/>
			<input name='clientPhone' value={client.phone} readOnly type='hidden' />
		</form>
	)
}

export default PayForm
