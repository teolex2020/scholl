// Тимчасовий діагностичний скрипт: проходить шлях покупки як користувач
// і друкує всі логи консолі браузера + мережеві запити оплати.
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const BASE = 'http://localhost:3000'

const log = (...a) => console.log('[diag]', ...a)

const browser = await puppeteer.launch({
	executablePath: EDGE,
	headless: 'new',
	args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
	const page = await browser.newPage()
	await page.setViewport({ width: 1366, height: 900 })

	page.on('console', (msg) =>
		console.log(`[browser:${msg.type()}]`, msg.text().slice(0, 500))
	)
	page.on('pageerror', (err) =>
		console.log('[browser:PAGEERROR]', String(err).slice(0, 800))
	)
	page.on('requestfailed', (req) =>
		console.log('[net:FAILED]', req.method(), req.url(), req.failure()?.errorText)
	)
	page.on('response', (res) => {
		const u = res.url()
		if (u.includes('createorder') || u.includes('wayforpay'))
			console.log('[net]', res.status(), res.request().method(), u)
	})

	log('1. Відкриваю сторінку зустрічі...')
	await page.goto(`${BASE}/uk/meeting/20330`, {
		waitUntil: 'domcontentloaded',
		timeout: 60000,
	})

	log('2. Шукаю кнопку покупки...')
	await new Promise((r) => setTimeout(r, 4000))
	const buyClicked = await page.evaluate(() => {
		const btns = [...document.querySelectorAll('button')]
		const target = btns.find((b) =>
			/заброн|reserve|купити|придбати|оплат/i.test(b.textContent || '')
		)
		if (target) {
			target.click()
			return target.textContent.trim().slice(0, 60)
		}
		return null
	})
	log('   кнопка покупки:', buyClicked ?? 'НЕ ЗНАЙДЕНА')

	log('3. Чекаю на сторінку оплати (поле firstName)...')
	await page.waitForSelector('input[name="firstName"]', { timeout: 20000 })
	log('   форма оплати зʼявилась. URL:', page.url())

	log('4. Заповнюю форму...')
	const fill = async (name, value) => {
		await page.evaluate((n) => {
			const el = document.querySelector(`input[name="${n}"]`)
			if (el) el.value = ''
		}, name)
		await page.type(`input[name="${name}"]`, value, { delay: 10 })
	}
	await fill('firstName', 'Oleksandr')
	await fill('lastName', 'Tepliuk')
	await fill('phone', '+380984568441')
	await fill('email', 'teolex2017@gmail.com')

	log('5. Стан кнопки оплати перед кліком:')
	const btnState = await page.evaluate(() => {
		const all = [...document.querySelectorAll('button')].map((b) => ({
			type: b.type,
			text: (b.textContent || '').trim().slice(0, 50),
		}))
		const btn = [...document.querySelectorAll('button')].find((b) =>
			/перейти до оплати|proceed to payment/i.test(b.textContent || '')
		)
		if (!btn) return { found: false, allButtons: all }
		btn.scrollIntoView({ block: 'center' })
		const r = btn.getBoundingClientRect()
		const topEl = document.elementFromPoint(
			r.left + r.width / 2,
			r.top + r.height / 2
		)
		return {
			found: true,
			text: btn.textContent.trim().slice(0, 60),
			type: btn.type,
			disabled: btn.disabled,
			insideForm: !!btn.closest('form'),
			rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
			coveredBy:
				topEl === btn || btn.contains(topEl)
					? 'кнопка доступна'
					: `ПЕРЕКРИТА: <${topEl?.tagName?.toLowerCase()} class="${String(topEl?.className).slice(0, 100)}">`,
		}
	})
	console.log(JSON.stringify(btnState, null, 1))

	log('6. Клікаю "Перейти до оплати" реальною мишею...')
	const payBtn = await page.evaluateHandle(() =>
		[...document.querySelectorAll('button')].find((b) =>
			/перейти до оплати|proceed to payment/i.test(b.textContent || '')
		)
	)
	await payBtn.asElement().click()

	log('7. Чекаю 12с на результат (логи/редірект)...')
	await new Promise((r) => setTimeout(r, 12000))

	log('8. Фінальний URL:', page.url())
	const toast = await page.evaluate(
		() =>
			document.querySelector('.Toastify__toast')?.textContent?.slice(0, 200) ??
			null
	)
	log('   тост:', toast ?? 'немає')
} finally {
	await browser.close()
}
