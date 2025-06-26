import { notFound } from 'next/navigation';
import DestinationClient from './DestinationClient';

export default function DestinationPage({
  params,
}: {
  params: { place: string };
}) {
  const { place } = params;

  if (!place) notFound();

  return <DestinationClient place={decodeURIComponent(place)} />;
}
