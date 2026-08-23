import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const DEFAULT_FALLBACK_MODELS = [
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'groq/compound-mini',
];

function isModelUnavailableError(error: unknown): boolean {
  const errorText = error instanceof Error ? error.message : JSON.stringify(error);
  return (
    errorText.includes('model_not_found') ||
    errorText.includes('does not exist or you do not have access to it')
  );
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const configuredModel = process.env.GROQ_MODEL;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: GROQ_API_KEY is missing' },
        { status: 500 },
      );
    }

    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const groq = new Groq({ apiKey });
    const candidateModels = [
      ...(configuredModel ? [configuredModel] : []),
      ...DEFAULT_FALLBACK_MODELS,
    ].filter((model, index, list) => list.indexOf(model) === index);

    let completion: Awaited<ReturnType<typeof groq.chat.completions.create>> | null = null;
    let lastError: unknown = null;
    for (const model of candidateModels) {
      try {
        completion = await groq.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5,
        });
        break;
      } catch (error: unknown) {
        lastError = error;
        if (isModelUnavailableError(error)) {
          continue;
        }
        throw error;
      }
    }

    if (!completion) {
      const providerMessage =
        lastError instanceof Error ? lastError.message : JSON.stringify(lastError);
      return NextResponse.json(
        {
          error: `No available Groq model found for this key. Last provider error: ${providerMessage}`,
        },
        { status: 502 },
      );
    }

    const message = completion.choices[0]?.message?.content;
    if (!message) {
      return NextResponse.json(
        { error: 'AI provider returned an empty response' },
        { status: 502 },
      );
    }

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