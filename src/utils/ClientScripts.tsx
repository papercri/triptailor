// components/ClientScripts.tsx
'use client';
import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }

    // Search
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.hero__search .btn');
    if (searchButton && searchInput) {
      searchButton.addEventListener('click', () => {
        const destination = (searchInput as HTMLInputElement).value.trim();
        if (destination) {
          alert(`Buscando información sobre: ${destination}`);
        }
      });
    }

    // Tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Form
    const plannerForm = document.querySelector('.planner__form');
    if (plannerForm) {
      plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Generando tu plan personalizado! Esta funcionalidad se implementará con IA.');
      });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Optional: cleanup
    return () => {
      // Aquí podrías eliminar los eventListeners si lo necesitas
    };
  }, []);

  return null; // Este componente solo ejecuta JS
}
