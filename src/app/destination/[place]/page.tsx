import { notFound } from 'next/navigation';
import DestinationClient from './DestinationClient';
import { FC } from "react";

  type Props = {
    params: { place: string };
  };
const DestinationPage: FC<Props> = ({ params }) => {
  const { place } = params;

   if (!place) notFound();

  return <DestinationClient place={decodeURIComponent(params.place)} />;
};

export default DestinationPage;

