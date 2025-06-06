import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const message = completion.choices[0]?.message?.content;
    return NextResponse.json({ message });
  } catch (error: unknown) {
    console.error('🔥 FULL API ERROR:', error);


    const errorMessage =
      error instanceof Error
        ? error.message
        : JSON.stringify(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
