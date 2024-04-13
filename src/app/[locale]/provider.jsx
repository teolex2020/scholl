import { NextIntlClientProvider, useMessages } from 'next-intl'

export default function LocaleProvider({
	children,
}) {
	const messages = useMessages()

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	)
}
