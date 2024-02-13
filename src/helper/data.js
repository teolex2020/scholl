const today = new Date()
export const formattedDate = today.toLocaleDateString('uk-UA', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
})
