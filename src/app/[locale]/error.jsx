'use client'

export default function GlobalError({ error, reset }) {
	return (
		<html>
			<body>
				<div className='flex justify-center items-center w-full h-full'>
					<h2>Something went wrong!</h2>
					<button onClick={() => reset()}>Try again</button>
				</div>
			</body>
		</html>
	)
}
