// lib/session-thread.ts
const KEY = 'oa_thread'
const TTL = 10 * 60_000 // 10 хвилин

export function loadThread() {
	if (typeof window === 'undefined') return null // SSR‑захист
	const raw = sessionStorage.getItem(KEY)
	if (!raw) return null

	try {
		const { id, ts } = JSON.parse(raw)
		return Date.now() - ts < TTL ? id : null
	} catch {
		sessionStorage.removeItem(KEY)
		return null
	}
}

export function saveThread(id) {
	if (typeof window === 'undefined') return
	sessionStorage.setItem(KEY, JSON.stringify({ id, ts: Date.now() }))
}
