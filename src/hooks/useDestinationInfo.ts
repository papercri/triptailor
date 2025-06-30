import useSWR from 'swr';

type FetchError = Error & { status?: number; statusText?: string };

 const fetcher = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout

  try {
    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(timeoutId);

    const text = await res.text();

    if (!res.ok) {
      let errorMessage = `Failed to fetch destination data: ${res.status} ${res.statusText}`;

      try {
        const data = JSON.parse(text);
        if (data.error) errorMessage += ` - ${data.error}`;
      } catch {
        errorMessage += ` - ${text.substring(0, 100)}`;
      }

      const error: FetchError = new Error(errorMessage);
      error.status = res.status;
      error.statusText = res.statusText;
      throw error;
    }

    try {
      const isJson = text.trim().startsWith('{') || text.trim().startsWith('[');
      if (isJson) {
        return JSON.parse(text);
      } else {
        throw new Error(`Unexpected non-JSON response: ${text.substring(0, 100)}`);
      }
    } catch (err) {
      console.error('Error parsing response as JSON:', err);
      throw new Error('Invalid JSON in successful response');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    // Si la petición fue abortada por timeout, lanzamos un error personalizado
    if (typeof error === 'object' && error !== null && 'name' in error && (error as { name?: string }).name === 'AbortError') {
      throw new Error('Request timed out after 30 seconds');
    }
    throw error;
  }
};

export function useDestinationInfo(place: string) {
  const encoded = encodeURIComponent(place)
  const { data, error, isLoading, mutate } = useSWR(`/api/destination-info?place=${encoded}`, fetcher, {
    // Configuraciones adicionales de SWR
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    // Timeout de 30 segundos
    timeout: 30000,
  })

  return {
    data,
    error,
    isLoading,
    mutate, // Para poder revalidar manualmente
  }
}
//este código es un hook de React que utiliza SWR para obtener información sobre un destino específico.
// Utiliza la función fetcher para hacer una solicitud a la API y manejar errores de manera adecuada.
// El hook devuelve los datos, el error y el estado de carga, que pueden ser utilizados
