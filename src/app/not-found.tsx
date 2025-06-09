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
        <h2 className="text-3xl font-bold !mb-2">Page not found</h2>
        <p className="text-gray-600 text-lg !mb-4">
   
          Sorry, we couldn&lsquo;t find the destination you&lsquo;re looking for.  
          Please check the spelling or return to the homepage.
        </p>
        <Link href="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </main>

<Footer />
    </>
   
  );
}