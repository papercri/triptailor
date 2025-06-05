import React from 'react'

export default function Header() {
  return (
    <header className="header">
        <div className="container">
            <nav className="nav">
                <a href="#" className="nav__logo">
                    ✈️ TripTailor
                </a>
                
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
                
                <div className="nav__hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
            
            <div className="header__mobile-menu" id="mobileMenu">
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
        </div>
    </header>
  )
}
