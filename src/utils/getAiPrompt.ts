export async function getAIPrompt(prompt: string): Promise<string | null> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API error ${res.status}:`, errorText); 
    return null;
  }

  const data = await res.json();
  return data.message || null;
}
