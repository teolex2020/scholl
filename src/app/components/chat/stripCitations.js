// utils/stripCitations.ts
export const stripCitations = (text) =>
	text.replace(/【\d+(?::\d+)?†source】/g, '').trim()
