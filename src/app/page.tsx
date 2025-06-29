
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import Hero from '@/components/homePage/hero/Hero';

import About from '@/components/homePage/about/About';
// import Destinos from '@/components/homePage/destinos/Destinos';

export default function Home() {
  
  return (
    <>
    <Header />
    <main>
      <div id="home"></div>
      <Hero />

      <div id="sobre-nosotros"></div>
      <About />

      {/*<div id="destinos"></div>
      <Destinos />*/}
    </main>
    
    <Footer />
    </>
 
  );
}
