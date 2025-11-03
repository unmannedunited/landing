'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getImageUrl, getLinkUrl } from "../../lib/utils";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const savedScrollY = useRef(0);
  const pathname = usePathname();

  // Deshabilitar scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      // Guardar la posición actual del scroll
      savedScrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar el scroll cuando se cierra el menú
        const scrollY = savedScrollY.current;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Esperar a que el DOM se actualice antes de restaurar el scroll
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollY,
              behavior: 'instant'
            });
            lastScrollY.current = scrollY;
          });
        });
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si el menú está abierto, no hacer nada
      if (isMenuOpen) {
        return;
      }

      // Mostrar nav al hacer scroll hacia arriba o si está en el top
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsNavVisible(true);
      } 
      // Ocultar nav al hacer scroll hacia abajo
      else if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setIsNavVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Esperar a que el menú se cierre y el scroll se restaure antes de hacer scroll al formulario
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const contactForm = document.getElementById('contact-form');
          if (contactForm) {
            contactForm.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }, 100); // Pequeño delay para asegurar que el scroll se haya restaurado
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    if (!isMenuOpen) {
      e.preventDefault();
      handleMenuToggle();
    }
  };

  return (
    <>
      {/* Overlay blanco cuando el menú está abierto */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 opacity-80 bg-white z-40 transition-opacity duration-500 ease-out"
          style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
          onClick={handleMenuClose}
        />
      )}

      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 w-full overflow-hidden transition-all duration-500 ease-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'} ${isMenuOpen ? 'bg-blue border-white' : 'h-16 border-b border-dashed bg-background border-foreground'}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 3001 }}>
        {/* Barra superior del nav */}
        <div className="md:hidden max-w-[100vw] flex items-center h-16 px-12 relative">
          {/* Logo con transición */}
          <div className={`absolute flex items-center gap-2 uppercase cursor-pointer text-sm font-syncopate font-regular tracking-[4.5px] whitespace-nowrap transition-all duration-500 ease-in-out ${isMenuOpen ? 'left-12' : 'left-1/2 -translate-x-1/2'}`}>
            {isMenuOpen ? (
              <Link 
                className="flex items-center text-background gap-2"
                href={"/"}
                onClick={handleMenuClose}
              >
                <img src={getImageUrl("/unmanned-logo.png")} alt="Unmanned united" className="w-10 h-10 flex-shrink-0 brightness-0 invert transition-all duration-500" />
                <span className="hidden sm:inline text-background">Unmanned united</span>
              </Link>
            ) : (
              <button
                onClick={handleLogoClick}
                className="flex items-center text-foreground gap-2"
              >
                <img src={getImageUrl("/unmanned-logo.png")} alt="Unmanned united" className="w-10 h-10 flex-shrink-0 transition-all duration-500" />
                <span className="hidden sm:inline">Unmanned united</span>
              </button>
            )}
          </div>
          
          {/* Botón hamburguesa - solo visible cuando el menú está abierto */}
          {isMenuOpen && (
            <button
              onClick={handleMenuToggle}
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer ml-auto"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-background transition-all duration-300 rotate-45 translate-y-2"></span>
              <span className="block w-6 h-0.5 bg-background transition-all duration-300 opacity-0"></span>
              <span className="block w-6 h-0.5 bg-background transition-all duration-300 -rotate-45 -translate-y-2"></span>
            </button>
          )}
        </div>

        {/* Menú hamburguesa desplegable - ahora parte del nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pb-12 px-12 border-b border-dashed border-foreground">
            <div className="flex flex-col py-6 gap-4 border-b border-t border-dashed border-white">
              <Link 
                className={`flex items-center text-background gap-2 uppercase cursor-pointer text-lg font-syncopate font-regular tracking-[4.5px] whitespace-nowrap transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 delay-200' : 'opacity-0'} ${pathname === '/' ? 'underline decoration-1 underline-offset-4' : ''}`}
                href={"/"}
                onClick={handleMenuClose}
              >
                Home
              </Link>
              <Link 
                className={`flex items-center text-background gap-2 uppercase cursor-pointer text-lg font-syncopate font-regular tracking-[4.5px] whitespace-nowrap transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 delay-200' : 'opacity-0'} ${pathname === '/about' ? 'underline decoration-1 underline-offset-4' : ''}`}
                href={"/about"}
                onClick={handleMenuClose}
              >
                About us
              </Link>
              <Link 
                className={`flex items-center text-background gap-2 uppercase cursor-pointer text-lg font-syncopate font-regular tracking-[4.5px] whitespace-nowrap transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 delay-200' : 'opacity-0'} ${pathname === '/overwatch' ? 'underline decoration-1 underline-offset-4' : ''}`}
                href={"/overwatch"}
                onClick={handleMenuClose}
              >
                Overwatch-LR™
              </Link>
              <a 
                className={`uppercase text-background font-syncopate font-regular text-lg tracking-[4.5px] cursor-pointer whitespace-nowrap transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 delay-200' : 'opacity-0'}`}
                href="#contact-form"
                onClick={handleContactClick}
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop: Logo + Contact */}
      <nav className={`fixed top-0 left-0 right-0 h-16 bg-background border-b border-dashed border-foreground z-50 w-full hidden md:flex transition-transform duration-500 ease-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 3001 }}>
        <div className="h-full flex items-center justify-center w-full max-w-[1200px] mx-auto">
          <div className="items-center flex justify-between gap-4 uppercase tracking-[3px] font-regular w-full">
            <Link 
              className="flex items-center text-foreground gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap"
              href={"/"}
            >
              <img src={getImageUrl("/unmanned-logo.png")} alt="Unmanned united" className="w-8 h-8 flex-shrink-0" />
              Unmanned united
            </Link>
            <div className="flex items-center gap-12">
              <Link 
              className={`flex items-center text-darkblue gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap ${pathname === '/about' ? 'underline decoration-2 underline-offset-4' : ''}`}
              href={"/about"}
              >
                About us
              </Link>
              <Link 
                className={`flex items-center text-darkblue gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap ${pathname === '/overwatch' ? 'underline decoration-2 underline-offset-4' : ''}`}
                href={"/overwatch"}
              >
                Overwatch-LR™
              </Link>
            </div>
            
            <a 
              className="uppercase text-xs text-foreground font-syncopate font-regular tracking-[4.5px] cursor-pointer whitespace-nowrap"
              href="#contact-form"
              onClick={handleContactClick}
            >
              Contact us
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
