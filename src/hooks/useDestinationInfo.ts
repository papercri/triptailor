import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch destination data');
  return res.json();
});

export function useDestinationInfo(place: string) {
  const encoded = encodeURIComponent(place);
  const { data, error, isLoading } = useSWR(`/api/destination-info?place=${encoded}`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
