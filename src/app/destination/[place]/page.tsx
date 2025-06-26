import { notFound } from "next/navigation"
import DestinationClient from "./DestinationClient"

interface PageProps {
  params: Promise<{ place: string }>
}

export default async function DestinationPage({ params }: PageProps) {
  const { place } = await params

  if (!place) {
    notFound()
  }

  return <DestinationClient place={decodeURIComponent(place)} />
}
