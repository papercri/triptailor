import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: prompt }],
      "temperature": 0.5,
    });

    const message = completion.choices[0]?.message?.content;
    return NextResponse.json({ message });
  } catch (error: unknown) {
    console.error('FULL API ERROR:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : JSON.stringify(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}