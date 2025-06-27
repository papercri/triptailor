import { NextResponse } from "next/server"
import { getCoordinatesWithTranslation } from "@/utils/geoCordTranslatorHelper"
import { getCountryData } from "@/services/getCountryData"
import { getTimeZone } from "@/services/getTimeZone"
import { getWeather } from "@/services/getWeather"
import { getCuisineInfo } from "@/services/getCuisineInfo"
import { getCultureInfo } from "@/services/getCultureInfo"
import placeTranslations from "@/data/placeTranslations.json"

const translations = placeTranslations as Record<string, string>

// Timeout wrapper para evitar que las funciones se cuelguen
async function withTimeout<T>(promise: Promise<T>, timeoutMs = 10000, label = "operation"): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout: ${label} took longer than ${timeoutMs}ms`)), timeoutMs)
  })

  return Promise.race([promise, timeoutPromise])
}

async function safeFetchJson<T>(fn: () => Promise<T>, label: string, timeoutMs = 8000): Promise<T | null> {
  try {
    console.log(`🔄 Starting ${label}...`)
    const result = await withTimeout(fn(), timeoutMs, label)
    console.log(`✅ ${label} completed successfully`)
    return result
  } catch (error) {
    if (error instanceof Error && error.message.includes("Timeout")) {
      console.error(`⏰ ${label} timed out:`, error.message)
    } else if (error instanceof SyntaxError) {
      console.error(`❌ SyntaxError in ${label}:`, error.message)
    } else {
      console.error(`❌ Error fetching ${label}:`, error)
    }
    return null
  }
}

export async function GET(req: Request) {
  const startTime = Date.now()

  try {
    const { searchParams } = new URL(req.url)
    const place = searchParams.get("place")

    if (!place) {
      return NextResponse.json({ error: "Missing place parameter" }, { status: 400 })
    }

    const decodedPlace = decodeURIComponent(place)
    console.log("🔍 Processing place:", decodedPlace)

    // Step 1: Get coordinates (crítico - sin esto no podemos continuar)
    const coords = await safeFetchJson(() => getCoordinatesWithTranslation(decodedPlace), "coordinates", 5000)

    if (!coords || !coords.displayName) {
      return NextResponse.json(
        {
          error: "Could not get coordinates for the specified place",
        },
        { status: 404 },
      )
    }

    // Preparar datos básicos
    const parts = coords.displayName.split(", ")
    const cityName = translations[parts[0]] || parts[0]
    const countryName = coords.address?.country || parts[parts.length - 1]
    const countryNameTranslated = translations[countryName] || countryName
    const breadcrumbDisplay = `${cityName}, ${countryNameTranslated}`

    console.log(`🌍 Processing: ${breadcrumbDisplay}`)

    // Step 2: Fetch all data in parallel with individual timeouts
    const [countryData, timeZone, weatherData, cuisineData, cultureData] = await Promise.allSettled([
      safeFetchJson(() => getCountryData(countryNameTranslated), "countryData", 6000),
      safeFetchJson(() => getTimeZone(coords.lat, coords.lng), "timeZone", 4000),
      safeFetchJson(() => getWeather(coords.lat, coords.lng), "weatherData", 6000),
      safeFetchJson(() => getCuisineInfo(countryNameTranslated), "cuisineData", 8000),
      safeFetchJson(() => getCultureInfo(countryNameTranslated), "cultureData", 8000),
    ])

    // Extract results from Promise.allSettled
    const countryResult = countryData.status === "fulfilled" ? countryData.value : null
    const timeZoneResult = timeZone.status === "fulfilled" ? timeZone.value : null
    const weatherResult = weatherData.status === "fulfilled" ? weatherData.value : null
    const cuisineResult = cuisineData.status === "fulfilled" ? cuisineData.value : null
    const cultureResult = cultureData.status === "fulfilled" ? cultureData.value : null

    const processingTime = Date.now() - startTime
    console.log(`⏱️ Total processing time: ${processingTime}ms`)

    // Devolver respuesta con datos disponibles
    const response = {
      coords,
      cityName,
      breadcrumbDisplay,
      countryData: countryResult,
      countryCommonName: countryResult?.name?.common ?? countryNameTranslated,
      timeZone: timeZoneResult,
      weatherData: weatherResult,
      cuisineData: cuisineResult,
      cultureData: cultureResult,
      meta: {
        processingTime,
        dataAvailability: {
          coordinates: !!coords,
          country: !!countryResult,
          timezone: !!timeZoneResult,
          weather: !!weatherResult,
          cuisine: !!cuisineResult,
          culture: !!cultureResult,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error(`💥 API Route Error after ${processingTime}ms:`, error)

    // Manejo específico de errores
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Failed to connect to external services",
          details: "Network connectivity issue",
        },
        { status: 503 },
      )
    }

    if (error instanceof Error && error.message.includes("Timeout")) {
      return NextResponse.json(
        {
          error: "Request timeout",
          details: "One or more services took too long to respond",
        },
        { status: 504 },
      )
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Invalid response format",
          details: "Received malformed data from external service",
        },
        { status: 502 },
      )
    }

    // Error genérico
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
