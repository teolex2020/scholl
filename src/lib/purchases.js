async function fetchData() {
	const response = await fetch(`/api/videocours`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: id,
		}),
	})

	if (response.ok) {
		const { data } = await response.json()

		setData(data)
	} else {
		console.error('Error')
	}
}
