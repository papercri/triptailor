import React from 'react'
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
     <footer className="footer">
        <div className="container">
            <div className="footer__content">
                <div className="footer__section">
                    <h4>TripTailor</h4>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/#destinos">Destinations</Link></li>
                        <li><Link href="/#sobre-nosotros">About Us </Link></li>
                        <li><Link href="mailto:papercri@gmail.com">Contact Us </Link></li>
                    </ul>
                </div>
                
                <div className="footer__section">
                    <h4>Destinations</h4>
                    <ul>
                        <li><Link href="#">Europe</Link></li>
                        <li><Link href="#">Asia</Link></li>
                        <li><Link href="#">America</Link></li>
                        <li><Link href="#">Africa</Link></li>
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
                <div className="footer__section">
                    <h4>Credits</h4>
                    <ul>
                        <li className='flex gap-4 text-2xl'>
                            <Link href="https://www.linkedin.com/in/cristianasollini" target='_blank'><FaLinkedin /></Link>
                            <Link href="https://github.com/papercri" target='_blank'><FaGithub /></Link>
                            <Link href="mailto:papercri@gmail.com"><MdOutlineEmail /></Link>
                        </li>
                            
                        

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
