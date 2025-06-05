import React from 'react'

export default function Footer() {
  return (
     <footer className="footer">
        <div className="container">
            <div className="footer__content">
                <div className="footer__section">
                    <h4>TripTailor</h4>
                    <ul>
                        <li><a href="#">Sobre nosotros</a></li>
                        <li><a href="#">Cómo funciona</a></li>
                        <li><a href="#">Blog de viajes</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Destinos</h4>
                    <ul>
                        <li><a href="#">Europa</a></li>
                        <li><a href="#">Asia</a></li>
                        <li><a href="#">América</a></li>
                        <li><a href="#">África</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Herramientas</h4>
                    <ul>
                        <li><a href="#">Planificador IA</a></li>
                        <li><a href="#">Calculadora de presupuesto</a></li>
                        <li><a href="#">Guías de viaje</a></li>
                        <li><a href="#">App móvil</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Soporte</h4>
                    <ul>
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Términos de uso</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer__bottom">
                <p>&copy; 2025 TripTailor. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  )
}
