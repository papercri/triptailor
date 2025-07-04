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
                        <li><Link href="/#cities">Destinations</Link></li>
                        <li><Link href="/#about">About </Link></li>
                        <li><Link href="mailto:papercri@gmail.com">Contact </Link></li>
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
                        <li className='flex gap-4 text-2xl justify-center sm:justify-start'>
                            <Link href="https://www.linkedin.com/in/cristianasollini" target='_blank'><FaLinkedin /></Link>
                            <Link href="https://github.com/papercri" target='_blank'><FaGithub /></Link>
                            <Link href="mailto:papercri@gmail.com"><MdOutlineEmail /></Link>
                        </li>
                    </ul>
                    <Link href="/">
                    <img src="/images/tripTailorBlue.png" alt="TripTailor Logo" className="logo-img sm:w-[120px] w-[120px] md:mt-20 mt-8 md:mx-0 mx-auto" />
                    </Link>
                </div>
            </div>
            
            <div className="footer__bottom">
                <p>&copy; 2025 TripTailor. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}
