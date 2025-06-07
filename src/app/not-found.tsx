import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-extrabold mb-6">🚫 Página no encontrada</h1>
      <p className="text-xl text-gray-600 mb-8">Lo sentimos, no pudimos encontrar el destino que buscabas.</p>
      <Link href="/" className="text-blue-600 hover:underline text-lg font-semibold">
        Volver al inicio
      </Link>
    </main>
  );
}