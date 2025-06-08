import Link from "next/link";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
export default function NotFound() {
  return (
    <>
     <Header />

    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center bg-gray-50">
      <div className="max-w-md">
        <h1 className="text-7xl font-black text-black !mb-2">404</h1>
        <h2 className="text-3xl font-bold !mb-2">Destino no encontrado</h2>
        <p className="text-gray-600 text-lg !mb-4">
          Lo sentimos, no pudimos encontrar el destino que estás buscando. 
          Revisa que el nombre esté bien escrito o vuelve a la página principal.
        </p>
        <Link href="/" className="btn btn--primary">
          Volver al inicio
        </Link>
      </div>
    </main>

<Footer />
    </>
   
  );
}