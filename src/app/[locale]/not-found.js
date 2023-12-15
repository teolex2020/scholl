import NotFoundComponent from '../components/helper/NotFoundComponent.jsx'
import { redirect } from 'next/navigation'

function NotFound() {
	const redirectState = true
	if (redirectState) redirect('/')
	return (
		<>
			<NotFoundComponent />
		</>
	)
}

export default NotFound
