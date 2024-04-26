import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
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
		model: 'gpt-4-turbo',
		stream: true,

		temperature: 0.3,
		messages: [
			{ role: 'system', content: prompt },
			...messages,
			// {
			// 	role: 'assistant',
			// 	content: 'The Los Angeles Dodgers won the World Series in 2020.',
			// },
		],
	})
	const stream = OpenAIStream(response)
	return new StreamingTextResponse(stream)
	
} catch (error) {
	 return NextResponse.json({ error: error }, { status: 500 })
}

  }