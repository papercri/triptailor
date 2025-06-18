export async function getPackingAndBudget({
  destination,
  days,
  season,
  travelerType,
}: {
  destination: string;
  days: number;
  season: string;
  travelerType: string;
}) {
  const systemMessage = "Eres un asistente de viajes que ayuda a planificar maletas y presupuestos.";
  const userMessage = `
  El usuario va a viajar a ${destination} durante ${days} días, en ${season}. Su perfil es "${travelerType}".
  1. Sugiere una lista breve de lo esencial que debería llevar en la maleta.
  2. Calcula un presupuesto aproximado diario y total en euros, incluyendo alojamiento, comida, transporte y actividades.
  Responde en tono cercano, en español, claro y estructurado.
  `;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
        },
      }),
    }
  );

  // console.log("Status:", response.status);
  const result = await response.json();
  // console.log("Result:", JSON.stringify(result, null, 2));

  if (Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text;
  } else if (typeof result.generated_text === 'string') {
    return result.generated_text;
  } else if (result.error) {
    return `Error from model: ${result.error}`;
  } else {
    return "Lo siento, no pude generar la respuesta. Inténtalo de nuevo.";
  }
}
