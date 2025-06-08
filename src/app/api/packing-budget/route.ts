export async function POST(request: Request) {
  try {
    const { destination, days, season, travelerType } = await request.json();

    // Puedes imprimir los datos recibidos para confirmar que llegan bien
    console.log('Request data:', { destination, days, season, travelerType });

    const prompt = `
Eres un asistente de viajes. El usuario va a viajar a ${destination} durante ${days} días, en ${season}. Su perfil es "${travelerType}". 
1. Sugiere una lista breve de lo esencial que debería llevar en la maleta.
2. Calcula un presupuesto aproximado diario y total en euros, incluyendo alojamiento, comida, transporte y actividades.

Responde en tono cercano, en español, claro y estructurado.
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: [],
            generated_responses: [],
            text: prompt,
          },
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    // Si la respuesta no es OK, loguea el error detallado
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error from Hugging Face API:', response.status, errorBody);
      return new Response(JSON.stringify({ error: 'Error al llamar al modelo: ' + errorBody }), { status: 500 });
    }

    const result = await response.json();

    let text = "No se pudo generar la respuesta.";
    if (Array.isArray(result) && result[0]?.generated_text) {
      text = result[0].generated_text;
    } else if (typeof result.generated_text === 'string') {
      text = result.generated_text;
    }

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("API error catched:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}
