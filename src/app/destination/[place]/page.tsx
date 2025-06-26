import { notFound } from 'next/navigation';
import DestinationClient from './DestinationClient';

type Props = {
  params: { place: string };
};

export default function DestinationPage({ params }: Props) {
  if (!params.place) notFound();

  return <DestinationClient place={decodeURIComponent(params.place)} />;
}