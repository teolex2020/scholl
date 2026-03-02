import OpenAI from 'openai';
import { NextResponse } from 'next/server'

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API1,
})


export const runtime = 'edge';

export async function POST(req) {
 if (!openai) {
		  throw new Error(
        "The OpenAI API key is not defined in environment variables.")
 }
try {
	const { messages, prompt } = await req.json()

	const response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		stream: true,
		temperature: 0.3,
		messages: [
			{ role: 'system', content: prompt },
			...messages,
		],
	})

	const encoder = new TextEncoder()
	const stream = new ReadableStream({
		async start(controller) {
			for await (const chunk of response) {
				const text = chunk.choices[0]?.delta?.content || ''
				if (text) {
					controller.enqueue(encoder.encode(text))
				}
			}
			controller.close()
		},
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})

} catch (error) {
	 return NextResponse.json({ error: error }, { status: 500 })
}

  }
