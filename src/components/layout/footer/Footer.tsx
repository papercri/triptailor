import React from 'react'

export default function Footer() {
  return (
     <footer className="footer">
        <div className="container">
            <div className="footer__content">
                <div className="footer__section">
                    <h4>TripTailor</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">How It Works</a></li>
                        <li><a href="#">Travel Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Destinations</h4>
                    <ul>
                        <li><a href="#">Europe</a></li>
                        <li><a href="#">Asia</a></li>
                        <li><a href="#">America</a></li>
                        <li><a href="#">Africa</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Tools</h4>
                    <ul>
                        <li><a href="#">AI Planner</a></li>
                        <li><a href="#">Budget Calculator</a></li>
                        <li><a href="#">Travel Guides</a></li>
                        <li><a href="#">Mobile App</a></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer__bottom">
                <p>&copy; 2025 TripTailor. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}
