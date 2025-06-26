import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    // Leer el texto para poder mostrarlo o incluirlo en el error
    const text = await res.text();

    // Intenta parsear JSON para mostrar el mensaje de error
    let errorMessage = `Failed to fetch destination data: ${res.status} ${res.statusText}`;

    try {
      const data = JSON.parse(text);
      if (data.error) errorMessage += ` - ${data.error}`;
    } catch {
      // No es JSON, texto plano o HTML, se puede mostrar raw
      errorMessage += ` - ${text.substring(0, 100)}`; // corta el texto largo
    }

    throw new Error(errorMessage);
  }

  // Si está OK, parsea y devuelve JSON
  return res.json();
};


export function useDestinationInfo(place: string) {
  const encoded = encodeURIComponent(place);
  const { data, error, isLoading } = useSWR(`/api/destination-info?place=${encoded}`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
//este código es un hook de React que utiliza SWR para obtener información sobre un destino específico.
// Utiliza la función fetcher para hacer una solicitud a la API y manejar errores de manera adecuada.
// El hook devuelve los datos, el error y el estado de carga, que pueden ser utilizados
