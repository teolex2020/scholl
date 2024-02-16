"use client"
import React from 'react'
import { useLocale } from 'next-intl'
const merchantDomainName = process.env.NEXT_PUBLIC_WAYFORPAY_DOMAIN
const account = process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT
const url = process.env.NEXT_PUBLIC_URL



const PaymentPage = ({
	merch,
	orderId,
	orderTitle,
	orderPrice,
	email,
	data,
	titleButton,
	firstName,
	lastName,
}) => {

	const locale = useLocale()


	return (
		<div className=' border-2 rounded-3xl border-[#e2a550] colorgold hover:font-semibold justify-center py-2 flex space-x-16 duration-300 hover:bg-blur z-50 text-lg lg:text-2xl px-10 max-w-[350px] mt-5 cursor-pointer'>
			<form
				className=' flex flex-col w-96'
				method='post'
				action='https://secure.wayforpay.com/pay'
				acceptCharset='utf-8'
			>
				<input name='merchantAccount' value={account} readOnly type='hidden' />
				<input
					name='merchantAuthType'
					value='SimpleSignature'
					readOnly
					type='hidden'
				/>
				<input
					name='merchantDomainName'
					value={merchantDomainName}
					readOnly
					type='hidden'
				/>
				<input name='orderReference' value={orderId} readOnly type='hidden' />
				<input name='orderDate' value={data} readOnly type='hidden' />
				<input name='amount' value={orderPrice} readOnly type='hidden' />
				<input name='currency' value='UAH' readOnly type='hidden' />
				<input name='orderTimeout' value='49000' readOnly type='hidden' />
				<input name='productName[]' value={orderTitle} readOnly type='hidden' />
				<input
					name='productPrice[]'
					value={orderPrice}
					readOnly
					type='hidden'
				/>
				<input name='productCount[]' value='1' readOnly type='hidden' />
				<input name='clientEmail' value={email} readOnly type='hidden' />
				<input
					name='defaultPaymentSystem'
					value='card'
					readOnly
					type='hidden'
				/>
				<input name='merchantSignature' value={merch} readOnly type='hidden' />

				{/* <input name='returnUrl' value={returnUrl} readOnly type='hidden' /> */}
				<input
					name='serviceUrl'
					value={`${merchantDomainName}/${locale}/api/status`}
					readOnly
					type='hidden'
				/>
				<input
					name='clientFirstName'
					value={firstName}
					readOnly
					type='hidden'
				/>
				<input name='clientLastName' value={lastName} readOnly type='hidden' />

				<input name='orderLifetime' value='600' readOnly type='hidden' />

				<input type='submit' value={titleButton} readOnly />
			</form>
		</div>
	)
}

export default PaymentPage
