// Серверний каталог цін: ціна береться ТІЛЬКИ звідси при створенні підпису,
// щоб клієнт не міг підмінити суму оплати у запиті.
// Українські файли — канонічне джерело (валюта оплати завжди UAH).
import { coursesua as courses } from '@/app/components/course/language/coursesua'
import { coursesua as lectures } from '@/app/components/lectures/language/lecturesua'
import { coursesua as meetings } from '@/app/components/meeting/language/meetua'
import { coursesua as trainings } from '@/app/components/Trainings/language/trainingua'

const catalog = new Map()

for (const item of [...courses, ...lectures, ...meetings, ...trainings]) {
	const id = item?.id != null ? String(item.id) : null
	const price = item?.price ? String(item.price).trim() : null
	if (id && price && !isNaN(price)) {
		catalog.set(id, price)
	}
}

export function getProductPrice(productId) {
	if (productId == null) return null
	return catalog.get(String(productId)) ?? null
}
