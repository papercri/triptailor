import { notFound } from "next/navigation"
import DestinationClient from "./DestinationClient"
interface PageProps {
  params: Promise<{ place: string }>
}

// Configuración importante para Vercel
export const dynamic = "force-dynamic"
export const dynamicParams = true

export default async function DestinationPage({ params }: PageProps) {
  const { place } = await params

  if (!place) {
    console.error("No place parameter found")
    notFound()
  }

  let decodedPlace: string
  try {
    decodedPlace = decodeURIComponent(place)
  } catch (error) {
    console.error("Error decoding place:", error)
    decodedPlace = place
  }
  

  return <DestinationClient place={decodedPlace} />
}
