'use client';
import Link from "next/link"
import  { useEffect } from 'react'
function Nav() {
     useEffect(() => {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (hamburger && mobileMenu) {
          hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
          });
            }
        }, []);
  return (
    <>
        <nav className="nav">
            <Link href="/" className="nav__logo">
                ✈️ TripTailor
            </Link>

            <ul className="nav__menu">
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/#destinos">Destinos</Link></li>
                <li><Link href="/#planificador">Planificador</Link></li>
                <li><Link href="/#sobre-nosotros">Sobre nosotros</Link></li>
            </ul>
            
            <div className="nav__auth">
                <Link href="/auth/signin" className="btn btn--outline">Iniciar sesión</Link>
                <Link href="/auth/signup" className="btn btn--primary">Registrarse</Link>
            </div>
            
            <div className="nav__hamburger" id="hamburger">
                 <span></span>
                <span></span>
                <span></span>

            </div>
        </nav>
        <div className="sticky-header__mobile-menu" id="mobileMenu">
            <ul className="nav__menu">
                <li><a href="#home">Inicio</a></li>
                <li><a href="#destinos">Destinos</a></li>
                <li><a href="#planificador">Planificador</a></li>
                <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
            </ul>
            <div className="nav__auth">
                <a href="#" className="btn btn--outline">Iniciar sesión</a>
                <a href="#" className="btn btn--primary">Registrarse</a>
            </div>
        </div>
    </>
  )
}

export default Nav