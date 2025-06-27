'use client';
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

  // Debug logging para Vercel
  console.log("🔍 Destination page accessed:", place)

  if (!place) {
    console.log("❌ No place parameter found")
    notFound()
  }

  let decodedPlace: string
  try {
    decodedPlace = decodeURIComponent(place)
    console.log("✅ Decoded place:", decodedPlace)
  } catch (error) {
    console.log("❌ Error decoding place:", error)
    decodedPlace = place
  }

  return <DestinationClient place={decodedPlace} />
}
